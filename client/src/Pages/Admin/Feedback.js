import React, {useState} from "react";
import Header from "../Header";
import Form from "react-bootstrap/Form";
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
//import {Link} from "react-router-dom";







const labels = {

    1: <text>Useless</text>,

    2: <text>Very&nbsp;Bad</text>,

    3: <text>Poor</text>,

    4: <text>Okay</text>,

    5: <text>Not&nbsp;Bad</text>,

    6: <text>Good</text>,

    7: <text>Excellent</text>,
};

const useStyles = makeStyles({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
});

let HoverRating = () => {
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Rating
                size="large"
                max={7}
                name="hover-feedback size-large"
                value={value}
                precision={1}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
        </div>
    );
}


const Feedback = () => {
    return (
        <div>
            <Header/>
            <div className="pt-0">
                <Container>
                    <Card className="pt-0">
                        <Card.Header as="h5">Feedback</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Your&nbsp;Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your Name here..." required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email&nbsp;Address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your Email here.." required/>
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
                                    <Form.Control as="textarea" rows="3" placeholder="Add your Comment here..."/>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Publish
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </div>
    );
}


export default (Feedback);