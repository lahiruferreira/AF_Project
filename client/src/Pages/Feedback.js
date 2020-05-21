import React, {useState} from "react";
import Header from "./Header";
import Form from "react-bootstrap/Form";
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
//import {Link} from "react-router-dom";


const Feedback = () => {

    const [feedback, setFeedback] = useState({
       name: "",
       email: "",
       rating: 1,
       comment: "",
    });

    const labels = {

        1: <>Useless</>,

        2: <>Very&nbsp;Bad</>,

        3: <>Poor</>,

        4: <>Okay</>,

        5: <>Not&nbsp;Bad</>,

        6: <>Good</>,

        7: <>Excellent</>,
    };

    const useStyles = makeStyles({
        root: {
            width: 200,
            display: 'flex',
            alignItems: 'center',
        },
    });

    let HoverRating = () => {

        const [hover, setHover] = useState(-1);
        const classes = useStyles();

        return (
            <div className={classes.root}>
                <Rating
                    size="large"
                    max={7}
                    name="hover-feedback size-large"
                    value={feedback.rating}
                    precision={1}
                    onChange={(event, newValue) => {
                        if (newValue <= 1) {
                            setFeedback({
                                name: feedback.name,
                                email: feedback.email,
                                rating: 1,
                                comment: feedback.comment,
                            });
                        } else {
                            setFeedback({
                                name: feedback.name,
                                email: feedback.email,
                                rating: newValue,
                                comment: feedback.comment,
                            })
                        }

                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                />
                <Box ml={2}>{labels[hover !== -1 ? hover : feedback.rating]}</Box>
            </div>
        );
    }


    let onChangeText = (event) => {
        switch (event.target.id) {

            case "name" :
                setFeedback({
                    name: event.target.value,
                    email: feedback.email,
                    rating: feedback.rating,
                    comment: feedback.comment,
                });
                break;
            case "emailId":
                setFeedback({
                    name: feedback.name,
                    email: event.target.value,
                    rating: feedback.rating,
                    comment: feedback.comment,
                });
                break;
            case "comment":
                setFeedback({
                    name: feedback.name,
                    email: feedback.email,
                    rating: feedback.rating,
                    comment: event.target.value,
                });
                break;
            default:
                break;

        }
    }

    let onFeedbackPost = (event) => {
        event.preventDefault();

        console.log(feedback);

        fetch("http://localhost:4001/feedback/add", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedback)
        }).then((r) => {

            if (r.status === 200) {
                alert("Feedback Posted!!");
                document.getElementById('name').value = '';
                document.getElementById('emailId').value = '';
                document.getElementById('comment').value = '';
                setFeedback({
                    name: "",
                    email: "",
                    rating: 1,
                    comment: "",
                })
            } else {
                alert("Error " + r.status + " Occurred..")
            }
        })

    }

    return (
        <>
            <Header/>
            <div className="pt-0">
                <Container>
                    <Card className="pt-0">
                        <Card.Header as="h5">Feedback</Card.Header>
                        <Card.Body>
                            <Form onSubmit={(event) => onFeedbackPost(event)}>
                                <Form.Group>
                                    <Form.Label>Your&nbsp;Name</Form.Label>
                                    <Form.Control id="name" onChange={(event) => onChangeText(event)} type="text" placeholder="Enter your Name here..." required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email&nbsp;Address</Form.Label>
                                    <Form.Control id="emailId" type="email" onChange={(event) => onChangeText(event)} placeholder="Enter your Email here.." required/>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Your&nbsp;Rating</Form.Label>
                                    {HoverRating()}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control id="comment" as="textarea" required rows="3" onChange={(event) => onChangeText(event)} placeholder="Add your Comment here..."/>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Publish
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </>
    );
}


export default (Feedback);