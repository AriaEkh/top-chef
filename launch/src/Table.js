import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
class Table extends Component {
    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Stars</th>
                        <th scope="col">Restaurant</th>
                        <th scope="col">Promotions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.restaurants.map(restaurant => {
                        console.log(restaurant.promo)
                        if (restaurant.promo.length != 0 && "PROMO NOT FOUND" != restaurant.promo) {
                            return (<tr>
                                <td>{restaurant.id}</td>
                                <td>{restaurant.name}</td>
                                <td>
                                    <StarRatingComponent
                                        name="etoileMichelin"
                                        starCount={3}
                                        value={restaurant.stars}
                                        editing={false}
                                    />
                                </td>
                                <td>
                                    {console.log("PROMO : " + restaurant.name)}
                                    <ul className="list-group">
                                        {restaurant.promo.map(promo => {
                                            return <li className="list-group-item">{promo.title}</li>
                                        })}
                                    </ul>
                                </td>
                            </tr>);
                        }
                    })}
                </tbody>
            </table>
        );
    }
}

export default Table;