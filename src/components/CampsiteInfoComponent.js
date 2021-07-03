import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Modal, ModalHeader, ModalBody, Label } from 'reactstrap';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
        this.toggleModal();
    }

    render () {
        return (
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select
                                    className="form-control"
                                    model=".rating"
                                    id="rating"
                                    name="rating">
                                    <option value="5">5</option>
                                    <option value="4">4</option>
                                    <option value="3">3</option>
                                    <option value="2">2</option>
                                    <option value="1">1</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Author</Label>
                                <Control.text
                                    className="form-control"
                                    model=".author"
                                    id="author"
                                    name="author"
                                    validators={{
                                        required,
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: "Required",
                                        minLength: "Must be at least 2 characters",
                                        maxLength: "Must be 15 characters or less"
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Text</Label>
                                <Control.textarea
                                    className="form-control"
                                    model=".text"
                                    rows="6"
                                    id="text"
                                    name="text"
                                />
                            </div>
                            <Button type="submit" color="primary">Submit Comment</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline color="primary">
                    <i className="fa fa-lg fa-pencil" aria-hidden="true" onClick={this.toggleModal}> Submit Comment</i>
                </Button>
            </div>
        )
    }
}

function RenderCampsite({campsite}) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>

            </div>
        )
    };

function RenderComments({comments}) {
        if (comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => 
                    <div key={comment.id}>
                        <p>Text: {comment.text}</p>
                        <p>{comment.author} - {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        <br />
                    </div>)}
                    <CommentForm />
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

function CampsiteInfo(props) {
        if (props.campsite) {
            console.log(props);
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                                <h2>{props.campsite.name}</h2>
                                <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite}/>
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }


export default CampsiteInfo