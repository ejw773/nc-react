import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderCard({item, isLoading,  errMess}) {
    if (isLoading) {
        return <Loading />;
    }
    if (errMess) {
        return (
            <h4>{errMess}</h4>
        )
    } 
    if (!isLoading && !errMess) {
    return (
        <Card>
            <CardImg src={baseUrl + item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
    } else {
        return <div />
    }
}

function Home(props) {
    console.log(props);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard 
                        item={props.campsite}
                        isLoading={props.campsitesLoading}
                        errMess={props.campsitesErrMess}
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard 
                        item={props.promotion} 
                        isLoading={props.promotionalLoading}
                        errMess={props.promotionErrMess}
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard 
                        item={props.partner}
                        isLoading={props.campsiteLoading}
                        errMess={props.campsitesErrMess}
                    />
                </div>
            </div>
        </div>
    )
}


export default Home;
