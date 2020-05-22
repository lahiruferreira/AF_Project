import React, {Component} from "react";
import Header from "./Header";
import Form from "react-bootstrap/Form";
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";


class Feedback extends Component {

    labels = {

        1: <>Useless</>,

        2: <>Very&nbsp;Bad</>,

        3: <>Poor</>,

        4: <>Okay</>,

        5: <>Not&nbsp;Bad</>,

        6: <>Good</>,

        7: <>Excellent</>,
    };

    constructor(props) {
        super(props);

        this.state = {
            feedback: {
                name: "",
                email: "",
                rating: 1,
                comment: "",
                reply: ""
            },
            feedbackList: [],
            hover: -1
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const url = "http://localhost:4001/feedback/";
        fetch(url).then(response => response.json())
            .then(json => this.setState({
                feedbackList: json
            }, () => {

                let sortedList = this.state.feedbackList;

                sortedList.sort((a, b) => {
                    return new Date(b.updatedAt) - new Date(a.updatedAt)
                })

                this.setState({
                    feedbackList: sortedList
                })
            }));
    }

    useStyles = () => makeStyles({
        root: {
            width: 200,
            display: 'flex',
            alignItems: 'center',
        },
    });

    classes = this.useStyles();

    HoverRating = () => {

        return (
            <div className={this.classes.root}>
                <Rating
                    size="large"
                    max={7}
                    name="hover-feedback size-large"
                    value={this.state.feedback.rating}
                    precision={1}
                    onChange={(event, newValue) => {
                        if (newValue <= 1) {
                            this.setState({
                                feedback: {
                                    name: this.state.feedback.name,
                                    email: this.state.feedback.email,
                                    rating: 1,
                                    comment: this.state.feedback.comment,
                                    reply: this.state.feedback.reply
                                }

                            });
                        } else {
                            this.setState({
                                feedback: {
                                    name: this.state.feedback.name,
                                    email: this.state.feedback.email,
                                    rating: newValue,
                                    comment: this.state.feedback.comment,
                                    reply: this.state.feedback.reply
                                }

                            })
                        }

                    }}
                    onChangeActive={(event, newHover) => {
                        this.setState({
                            hover: newHover
                        });
                    }}
                />
                <Box ml={2}>{this.labels[this.state.hover !== -1 ? this.state.hover : this.state.feedback.rating]}</Box>
            </div>
        );
    }


    onChangeText = (event) => {
        switch (event.target.id) {

            case "name" :
                this.setState({
                    feedback: {
                        name: event.target.value,
                        email: this.state.feedback.email,
                        rating: this.state.feedback.rating,
                        comment: this.state.feedback.comment,
                        reply: this.state.feedback.reply
                    }

                });
                break;
            case "emailId":
                this.setState({
                    feedback: {
                        name: this.state.feedback.name,
                        email: event.target.value,
                        rating: this.state.feedback.rating,
                        comment: this.state.feedback.comment,
                        reply: this.state.feedback.reply
                    }

                });
                break;
            case "comment":
                this.setState({
                    feedback: {
                        name: this.state.feedback.name,
                        email: this.state.feedback.email,
                        rating: this.state.feedback.rating,
                        comment: event.target.value,
                        reply: this.state.feedback.reply
                    }

                });
                break;
            default:
                break;

        }
    }

    onFeedbackPost = (event) => {
        event.preventDefault();

        console.log(this.state.feedback);

        fetch("http://localhost:4001/feedback/add", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.feedback)
        }).then((r) => {

            if (r.status === 200) {
                alert("Feedback Posted!!");
                document.getElementById('name').value = '';
                document.getElementById('emailId').value = '';
                document.getElementById('comment').value = '';
                this.fetchData();
                this.setState({

                    feedback: {
                        name: "",
                        email: "",
                        rating: 1,
                        comment: "",
                        reply: ""
                    }

                })
            } else {
                alert("Error " + r.status + " Occurred..")
            }
        })

    }

    render() {

        let feedbackList = this.state.feedbackList;

        return (
            <>
                <Header/>
                <div className="pt-0">
                    <Container>
                        <Card className="pt-0">
                            <Card.Header as="h5">Feedback</Card.Header>
                            <Card.Body>
                                <Form onSubmit={(event) => this.onFeedbackPost(event)}>
                                    <Form.Group>
                                        <Form.Label>Your&nbsp;Name</Form.Label>
                                        <Form.Control id="name" onChange={(event) => this.onChangeText(event)}
                                                      type="text" placeholder="Enter your Name here..." required/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email&nbsp;Address</Form.Label>
                                        <Form.Control id="emailId" type="email"
                                                      onChange={(event) => this.onChangeText(event)}
                                                      placeholder="Enter your Email here.." required/>
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Your&nbsp;Rating</Form.Label>
                                        {this.HoverRating()}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control id="comment" as="textarea" required rows="3"
                                                      onChange={(event) => this.onChangeText(event)}
                                                      placeholder="Add your Comment here..."/>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Publish
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
                <hr/>
                <div className="pt-0">
                    <Container>
                        <Card className="pt-0">
                            <Card.Header as="h5">Feedback&nbsp;from&nbsp;Users</Card.Header>
                            <Card.Body>

                                {
                                    feedbackList.map((feedback, index) => (
                                        <div key={index}>
                                            <div className="mr-5">
                                                <Card>
                                                    <Card.Header>
                                                        <div className="float-left">
                                                            {feedback.name}
                                                        </div>
                                                        <div className="float-right">
                                                            {feedback.email}
                                                        </div>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <div className="float-left w-100">

                                                            <Card.Title>{feedback.comment}</Card.Title>

                                                            <div className={this.classes.root}>
                                                                <Rating
                                                                    size="large"
                                                                    max={7}
                                                                    name="read-only size-large"
                                                                    value={feedback.rating}
                                                                    precision={1}
                                                                    readOnly
                                                                />

                                                            </div>

                                                            <hr/>

                                                            {
                                                                feedback.reply !== "" ?
                                                                    <div>
                                                                        <Card.Subtitle>Reply</Card.Subtitle>
                                                                        <Card.Text>{feedback.reply}</Card.Text>
                                                                    </div> : <></>
                                                            }


                                                        </div>


                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <div className="float-left">
                                                            Created&nbsp;on&nbsp;{new Date(feedback.createdAt).toLocaleDateString()}&nbsp;@&nbsp;{new Date(feedback.createdAt).toLocaleTimeString()}
                                                        </div>
                                                        {
                                                            feedback.reply !== "" ?
                                                                <div className="float-right">
                                                                    Replied&nbsp;on&nbsp;{new Date(feedback.updatedAt).toLocaleDateString()}&nbsp;@&nbsp;{new Date(feedback.updatedAt).toLocaleTimeString()}
                                                                </div> : <></>
                                                        }
                                                    </Card.Footer>

                                                </Card>
                                            </div>
                                            <hr/>
                                        </div>
                                    ))

                                }
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </>
        );
    }


}


export default Feedback;