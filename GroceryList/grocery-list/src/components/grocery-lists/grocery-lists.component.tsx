import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { environment } from '../../environment';
import { GroceryList } from '../../models/groceryList';


interface IState {
    groceryLists: GroceryList[],
    deleteList: GroceryList
}

export default class GetGroceryList extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            groceryLists: [],
            deleteList: new GroceryList()
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
    }

    goToList = (groceryListId: Number) => {
        localStorage.setItem("groceryListId", ""+groceryListId)
    }

    render() {
        const lists = this.state.groceryLists;
        return (
            <div>
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
                                    <td>{list.listName}</td>
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