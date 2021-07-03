import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Modal } from 'reactstrap';

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

    render () {
        return (
            <div>
                <Modal isOpen="true" toggle={this.toggleModal}>
                    <LocalForm>
                        <div className="form-control">
                            <Control.select
                                model=".rating"
                                options="1-5"
                                id="rating"
                                name="rating"
                            />
                        </div>
                        <div className="form-control">
                            <Control.text
                                model=".author"
                                id="author"
                                name="author"
                            />
                        </div>
                        <div className="form-control    ">
                            <Control.textarea
                                model=".text"
                                rows="6"
                                id="text"
                                name="text"
                            />
                        </div>
                        <button type="submit">Submit Comment</button>
                    </LocalForm>
                </Modal>
                <Button outline>
                    <i className="fa fa-lg fa-pencil" aria-hidden="true"> Submit Comment</i>
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