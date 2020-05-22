import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Rating from "@material-ui/lab/Rating";
import {makeStyles} from "@material-ui/core/styles";
import ReplyModal from "../Components/ReplyModal";

//import {Link} from "react-router-dom";


class Feedback extends Component {


    constructor(props) {
        super(props);

        this.state = {
            feedbackList: []
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
            }));
    }

    useStyles = () => makeStyles({
        root: {
            width: "auto",
            display: 'flex',
            alignItems: 'center',
        }
    });


    render() {


        const classes = this.useStyles();

        const feedbackList = this.state.feedbackList;


        return (


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
                                                    <div className="float-left w-75">

                                                        <Card.Title>{feedback.comment}</Card.Title>

                                                        <div className={classes.root}>
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
                                                    <div className="float-right flex-row w-25 text-center">

                                                        <ReplyModal feedbackObj={feedback}
                                                                    loadFunction={this.fetchData}/>

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


        );
    }


}


export default (Feedback);