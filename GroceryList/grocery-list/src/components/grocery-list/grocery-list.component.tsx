import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { environment } from '../../environment';
import { GroceryItem } from '../../models/groceryItem';


interface IState {
    groceryItems: GroceryItem[],
    groceryItem: {
        item: string,
        itemType: string
    }
}

export default class GetGroceryItems extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            groceryItems: [],
            groceryItem: {
                item: '',
                itemType: ''
            }
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
            groceryItems: itemsFromServer,
            groceryItem: {
                item: '',
                itemType: ''
            } 
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
        window.location.reload();
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            groceryItem: {
                ...this.state.groceryItem,
                [name]: event.target.value
            }
        });
    }

    submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const resp = await fetch(environment.context + '/grocery-lists/' + localStorage.getItem('groceryListId') + '/items', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(this.state.groceryItem),
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
        const items = this.state.groceryItems;
        return (
            <div>
                <div>
                <Button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
                </Button>
                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id="item-form" className="item-form" onSubmit={this.submit}>
                        <h5>Add Item to List</h5>
                        <div className = "col-xs-2 textinput">
                            <label htmlFor="inputitem" className="text-only">Item</label>
                            <input type="text" id="inputitem"
                                name="item"
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.groceryItem.item} required />
                        
                            <label htmlFor="inputtype" className="text-only">Type</label>
                            <input type="text" id="inputtype"
                                name="itemType"
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.groceryItem.itemType} required />
                        </div>
                        <Button className="post-btn btn-success" type="submit">Add Item</Button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <Button type="button" className="btn btn-secondary" data-dismiss="modal">Close</Button>
                        <Button type="button" className="btn btn-primary">Save changes</Button>
                    </div>
                    </div>
                </div>
                </div>
                    <form id="item-form" className="item-form" onSubmit={this.submit}>
                    <h5>Add Item to List</h5>
                    <div className = "col-xs-2 textinput">
                        <label htmlFor="inputitem" className="text-only">Item</label>
                        <input type="text" id="inputitem"
                            name="item"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.groceryItem.item} required />
                    
                        <label htmlFor="inputtype" className="text-only">Type</label>
                        <input type="text" id="inputtype"
                            name="itemType"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.groceryItem.itemType} required />
                    </div>
                    <Button className="post-btn btn-success" type="submit">Add Item</Button>
                    </form>
                </div>
                <h5>Items</h5>
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
                                            onClick={() => this.removeItem(item.itemId)}>
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