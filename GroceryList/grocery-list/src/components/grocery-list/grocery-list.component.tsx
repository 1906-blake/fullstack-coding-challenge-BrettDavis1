import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { environment } from '../../environment';
import { GroceryItem } from '../../models/groceryItem';


interface IState {
    groceryItems: GroceryItem[]
}

export default class GetGroceryItems extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            groceryItems: []
        };
    }

    async componentDidMount() {
        this.getGroceryItems();
    };
    getGroceryItems = async () => {
        const resp = await fetch(environment.context + '/grocery-item/' + localStorage.getItem('groceryListId'), {
            credentials: 'include'
        });
        const itemsFromServer = await resp.json();
        this.setState({
            groceryItems: itemsFromServer
        });
    }

    removeItem = async (itemId: Number) => {
        const resp = await fetch(environment.context + '/grocery-lists/' + localStorage.getItem('groceryListId') +
         '/items/' + itemId, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    render() {
        const items = this.state.groceryItems;
        return (
            <div>
                <table className="table table-striped table-light">
                    <thead className="fr-thead">
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Type</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(item =>
                                <tr key={'itemId-' + item.itemId}>
                                    <td>{item.item}</td>
                                    <td>{item.itemType}</td>
                                    <td>
                                        <Button className="btn btn-warning" type="button"
                                            onClick={() => this.removeItem(item.list.listId)}>
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