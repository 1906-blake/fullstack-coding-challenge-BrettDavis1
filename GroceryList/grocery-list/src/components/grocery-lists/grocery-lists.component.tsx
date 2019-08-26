import React, { Component } from 'react';
import { Button, Container, Row, Col, Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap';
import { environment } from '../../environment';
import { GroceryList } from '../../models/groceryList';
import { RouteComponentProps } from 'react-router';
import { listClient } from '../../axios/list.client.component';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';


interface IState {
    groceryLists: GroceryList[],
    deleteList: GroceryList,
    createList: {
        listId: Number,
        listName: string
    },
    page: Number,
    totalPages: Number
}

export default class GetGroceryList extends Component<RouteComponentProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            groceryLists: [],
            deleteList: new GroceryList(),
            createList: {
                listId: 0,
                listName: ''
            },
            page: 0,
            totalPages: 0
        };
    }

    async componentDidMount() {
        this.getGroceryListsPages(0);
    };

    getGroceryListsPages = async (page: Number) => {
        let resp = await listClient.get(`/grocery-lists/pages?page=${page}`)
        this.setState({
            groceryLists: resp.data.content,
            page,
            totalPages: resp.data.totalPages
        });
    }

    getGroceryLists = async () => {
        const resp = await fetch(environment.context + '/grocery-lists/', {
            credentials: 'include'
        });
        const listsFromServer = await resp.json();
        this.setState({
            groceryLists: listsFromServer
        });
    }

    removeList = async (deleteList: GroceryList) => {
        const resp = await fetch(environment.context + '/grocery-lists', {
            method: 'DELETE',
            credentials: 'include',
            body: JSON.stringify(deleteList),
            headers: {
                'content-type': 'application/json'
            }
        });
        window.location.reload();
    }

    goToList = (groceryListId: Number) => {
        localStorage.setItem("groceryListId", ""+groceryListId);
        this.props.history.push("items");
    }
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            createList: {
                ...this.state.createList,
                [name]: event.target.value
            }
        });
    }

    submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const resp = await fetch(environment.context + '/grocery-lists', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(this.state.createList),
                headers: {
                    'content-type': 'application/json'
                }
            });
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }
    render() {
        const lists = this.state.groceryLists;
        return (
            <div>
                <div>
                <Button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Create a List
                </Button>
                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create a List</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        <div className="modal-body">
                        <form id="list-form" className="list-form" onSubmit={this.submit}>
                    <div className = "col-xs-2 textinput">
                        <label htmlFor="inputlist" className="text-only">List Name</label>
                        <input type="text" id="inputlist"
                            name="listName"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.createList.listName} required />
                    </div>
                    </form>
                        </div>
                        <div className="modal-footer">
                            <Button type="submit" form="list-form">Create List</Button>
                            <Button type="button" className="btn btn-secondary" data-dismiss="modal">Close</Button>
                        </div>
                        </div></div>
                    </div>
                </div>
                    <Container>
                    <Row>
                        <Col>
                            <FaArrowCircleLeft className="clickable"
                                onClick={() => this.getGroceryListsPages(+this.state.page-1)} />
                        </Col>
                        <Col>
                            {+this.state.page + 1} of {this.state.totalPages}
                        </Col>
                        <Col>
                            <FaArrowCircleRight className="clickable" 
                                onClick={() => this.getGroceryListsPages(+this.state.page+1)} />
                        </Col>
                    </Row>
                    <Row>
                        {
                            this.state.groceryLists.map(list =>
                                <Col >
                                    <Card className="clickable" onClick={() => {this.goToList(list.listId)}}>
                                        <CardHeader>Name:</CardHeader>
                                        <CardBody>
                                            <CardTitle>{list.listName} </CardTitle>
                                        </CardBody>
                                    </Card>
                                </Col>)
                        }
                    </Row>
                </Container>
                {/* <table className="table table-striped table-light">
                    <thead className="fr-thead">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lists.map(list =>
                                <tr key={'listId-' + list.listId}>
                                    <td onClick={() => {this.goToList(list.listId)}}>{list.listName}</td>
                                    <td>
                                        <Button className="btn btn-warning" type="button"
                                            onClick={() => this.removeList(list)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table> */}
            </div>
        )
    }
}