import React, { Component } from "react";
import { Grid, Button, Icon, Pagination, Dropdown } from "semantic-ui-react";
import Api from "../services/Api";
import ModalForm from "../components/ModalForm";

export class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            action: "",
            param: "",
            list: [],
            modalCreateOpen: false,
            modalEditOpen: false,
            modalDeleteOpen: false,
            modalOpen: false,
            showOptions: [
                { key: 1, text: "5", value: 5 },
                { key: 2, text: "10", value: 10 },
                { key: 3, text: "All", value: 999 },
            ],
            showOptionsDefault: 10,
        };

        this.API = new Api();
    }

    componentDidMount() {
        // Initialize API data after the component has mounted
        this.Init();
    }

    Init() {
        this.setState({ type: this.props.title });
        this.API.GET(this.props.title).then((data) => {
            this.setState({ list: data });
            console.log("Loaded: ", data);
            return data;
        });
    }

    openModal(
        accept = false,
        type = this.state.type,
        action = this.state.action,
        param = this.state.param
    ) {
        this.setState({ modalOpen: !this.state.modalOpen });
        if (accept) {
            console.log("Accept", type, action, param);
            switch (action) {
                case "DELETE":
                    this.API.DELETE(type, param.id).then((res) => {
                        if (res.status !== 200) {
                            console.log(res);
                        }
                        this.Init();
                    });
                    break;
                case "EDIT":
                    this.API.PUT(type, param.id, param).then((res) => {
                        if (res.status !== 200) {
                            console.log(res);
                        }
                        this.Init();
                    });
                    break;
                default:
                    this.API.POST(type, param).then((res) => {
                        if (res.status !== 200) {
                            console.log(res);
                        }
                        this.Init();
                    });
                    break;
            }
            return true;
        }
        return false;
    }

    setModal(type, action = null, param = null) {
        this.setState({ type: type, action: action, param: param }, () => {
            console.log("Modal State: ", this.state, "Modal Param:", param);
            this.openModal(false, type, action, param);
        });
    }

    render() {
        return (
            <Grid celled>
                <ModalForm
                    open={this.state.modalOpen}
                    type={this.state.type}
                    action={this.state.action}
                    param={this.state.param}
                    closeMethod={this.openModal.bind(this)}
                />
                <Grid.Row color={"black"}>
                    <Grid.Column width={12}>
                        <h1>{this.props.title}</h1>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button
                            primary
                            fluid
                            onClick={() => {
                                this.setModal(this.state.type, "CREATE", {
                                    name: "",
                                    address: "",
                                    price: "",
                                    dateSold: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`,
                                });
                            }}
                        >
                            Add
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                {this.state.list.length > 0 ? (
                    this.state.list.map((o) => (
                        <Grid.Row key={o.id} columns="equal">
                            <Grid.Column>{o.id}</Grid.Column>
                            <Grid.Column>
                                {o.name}
                                {o.dateSold}
                            </Grid.Column>
                            <Grid.Column>
                                {o.address}
                                {o.price ? `$${o.price}` : ""}
                                {o.customer ? o.customer.name : ""}
                            </Grid.Column>
                            {o.product && (
                                <Grid.Column>{o.product && o.product.name}</Grid.Column>
                            )}
                            {o.store && (
                                <Grid.Column>{o.store && o.store.name}</Grid.Column>
                            )}
                            <Grid.Column>
                                <Button
                                    color={"yellow"}
                                    fluid
                                    onClick={() => this.setModal(this.state.type, "EDIT", o)}
                                    icon
                                    labelPosition="left"
                                >
                                    <Icon name="edit outline" />
                                    Edit
                                </Button>
                            </Grid.Column>
                            <Grid.Column>
                                <Button
                                    negative
                                    fluid
                                    onClick={() => this.setModal(this.state.type, "DELETE", o)}
                                    icon
                                    labelPosition="left"
                                >
                                    <Icon name="delete" />
                                    Delete
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    ))
                ) : (
                    <Grid.Row>
                        <Grid.Column textAlign="center">Nothing to show here. Add one!</Grid.Column>
                    </Grid.Row>
                )}
                <Grid stackable>
                    <Grid.Row columns="equal">
                        <Grid.Column>
                            <Dropdown
                                compact
                                selection
                                options={this.state.showOptions}
                                defaultValue={this.state.showOptionsDefault}
                            />
                        </Grid.Column>
                        <Grid.Column className="ui center aligned">
                            <Pagination
                                defaultActivePage={1}
                                totalPages={1}
                            ></Pagination>
                        </Grid.Column>
                        <Grid.Column></Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid>
        );
    }
}

export default Page;


