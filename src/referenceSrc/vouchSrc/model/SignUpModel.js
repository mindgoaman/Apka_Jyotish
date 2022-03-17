function SignUpModel(obj) {
	const {
		auth_token,
		email,
		first_name,
		last_name,
		user_id
	}
	this.authToken = auth_token;
	this.email = email;
	this.firstName = first_name;
	this.lastName = last_name;
	this.id = user_id;
}

export default SignUpModel;