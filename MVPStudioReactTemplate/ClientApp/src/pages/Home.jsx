import React, { Component } from "react";
import { Api } from "../services/Api";
import { Grid, Menu } from "semantic-ui-react";
import { Route, Link } from "react-router-dom";
import { Page } from "./Page";

export class Home extends Component {
	constructor(props) {
		super(props);
		this.API = new Api();
		this.state = {
			activeMenu: window.location.pathname.slice(1),
			customers: [],
		};

		this.PageRef = React.createRef();
	}

	Init() {
	}

	handleMenuClick = (e, { name }) => {
        if (this.state.activeMenu === name) {
            // Refresh data manually by clicking on the same menu in case API is disconnected and doesn't load any data when user went to this page
            console.log("Same menu has been clicked!");
            this.PageRef.current.Init();
        }

		this.setState({ activeMenu: name });
	};

	render() {
		return (
			<Grid container>
				<Grid.Column>
					<Grid.Row>
						<Menu fluid compact>
							<Menu.Item as={"h3"} header>
								React
							</Menu.Item>
							<Menu.Item
								as={Link}
								to="/"
								name="sales"
								active={this.state.activeMenu === "sales"}
								onClick={this.handleMenuClick}
							>
								Sales
							</Menu.Item>
							<Menu.Item
								as={Link}
								to="/stores"
								name="stores"
								active={this.state.activeMenu === "stores"}
								onClick={this.handleMenuClick}
							>
								Stores
							</Menu.Item>
							<Menu.Item
								as={Link}
								to="/customers"
								name="customers"
								active={this.state.activeMenu === "customers"}
								onClick={this.handleMenuClick}
							>
								Customers
							</Menu.Item>
							<Menu.Item
								as={Link}
								to="/products"
								name="products"
								active={this.state.activeMenu === "products"}
								onClick={this.handleMenuClick}
							>
								Products
							</Menu.Item>
						</Menu>
					</Grid.Row>
					<Grid.Row>
						<Route
							exact
							path="/"
							render={() => {
								return (
									<Page title="Sales" ref={this.PageRef} />
								);
							}}
						/>
						<Route
							exact
							path="/sales"
							render={() => {
								return (
									<Page title="Sales" ref={this.PageRef} />
								);
							}}
						/>
						<Route
							exact
							path="/stores"
							render={() => {
								return (
									<Page title="Stores" ref={this.PageRef} />
								);
							}}
						/>
						<Route
							exact
							path="/customers"
							render={() => {
								return (
									<Page
										title="Customers"
										ref={this.PageRef}
									/>
								);
							}}
						/>
						<Route
							exact
							path="/products"
							render={() => {
								return (
									<Page title="Products" ref={this.PageRef} />
								);
							}}
						/>
					</Grid.Row>
					<Grid.Row>© 2024 - Rahul</Grid.Row>
				</Grid.Column>
			</Grid>
		);
	}
}

export default Home;
