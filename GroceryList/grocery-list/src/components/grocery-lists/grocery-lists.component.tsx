import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { environment } from '../../environment';
import { GroceryList } from '../../models/groceryList';
import { RouteComponentProps } from 'react-router';


interface IState {
    groceryLists: GroceryList[],
    deleteList: GroceryList,
    createList: {
        listId: Number,
        listName: string
    }
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
            }
        };
    }

    async componentDidMount() {
        this.getGroceryLists();
    };
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
                <form id="list-form" className="list-form" onSubmit={this.submit}>
                    <h5>Add Item to List</h5>
                    <div className = "col-xs-2 textinput">
                        <label htmlFor="inputitem" className="text-only">Item</label>
                        <input type="text" id="inputitem"
                            name="listName"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.createList.listName} required />
                    </div>
                    <Button className="post-btn btn-success" type="submit">Add Item</Button>
                    </form>
                <table className="table table-striped table-light">
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
                </table>
            </div>
        )
    }
}