import React, {useState} from "react";
import Header from "../Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
//import {Link} from "react-router-dom";


const Feedback = () => {

    let [feedbackList, setFeedbackList] = useState([]);

    let fetchData = () => {
        const url = "http://localhost:4001/feedback/";
        fetch(url).then(response => response.json())
            .then(json => setFeedbackList(json));
    }

    const useStyles = makeStyles({
        root: {
            width: 200,
            display: 'flex',
            alignItems: 'center',
        },
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

    const classes = useStyles();


    return (
        <>
            <Header/>
            <div onLoadStart={fetchData()}>

                <div className="pt-0">
                    <Container>
                        <Card className="pt-0">
                            <Card.Header as="h5">Feedback&nbsp;from&nbsp;Users</Card.Header>
                            <Card.Body>

                                {
                                    feedbackList.map((feedback, index) => (
                                        <div className="mr-5" key={index}>
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
                                                        <Box ml={2}>{labels[feedback.rating]}</Box>
                                                    </div>

                                                </Card.Body>
                                                <Card.Footer>
                                                    <div className="float-left">
                                                        Created&nbsp;on&nbsp;{new Date(feedback.createdAt).toLocaleDateString()}&nbsp;@&nbsp;{new Date(feedback.createdAt).toLocaleTimeString()}
                                                    </div>
                                                    <div className="float-right">
                                                        Updated&nbsp;on&nbsp;{new Date(feedback.updatedAt).toLocaleDateString()}&nbsp;@&nbsp;{new Date(feedback.updatedAt).toLocaleTimeString()}
                                                    </div>
                                                </Card.Footer>

                                            </Card>
                                        </div>
                                    ))

                                }
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>
        </>
    );
}


export default (Feedback);