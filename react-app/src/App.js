import React, { Component } from 'react';
import axios from 'axios';
import Login from './pages/Login';

class App extends Component {
    state = {
        data: [],
    };

    async componentDidMount() {
        try {
            const { data } = await axios.get('/api/fake-data');
            console.log('INIT DATA => ', data);
            await this.setState({ data: data.fakeData });
        } catch (error) {
            console.error('Error => ', error);
        }
    }
    render() {
        return (
            <>
                <div>
                    <span>
                        Data from Mongo DB:
                        <ul>
                            {this.state.data.map((dt) => (
                                <li>
                                    <strong>
                                        Name: {dt.name} | Password:
                                        {dt.password}
                                    </strong>
                                </li>
                            ))}
                        </ul>
                    </span>
                </div>
                <Login title="Login" buttonTitle="Sign In"></Login>
            </>
        );
    }
}

export default App;
