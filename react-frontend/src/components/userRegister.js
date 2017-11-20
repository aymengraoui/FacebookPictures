/* eslint-disable */
import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

class userRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: ""
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeConfirmPass = this.handleChangeConfirmPass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkConfirmPassword = this.checkConfirmPassword.bind(this);
        this.disableSubmitButton = this.disableSubmitButton.bind(this);
    }

    checkEmail(style) {
        var email = document.getElementById("mail").children;
        // language=JSRegexp
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.state.email)) {
            if (style === true) {
                email[0].style.color = "#c00";
                email[1].style.borderBottom = "1px solid #c00";
                email[1].style.boxShadow = "0 0px 0 0 #fff";
                email[2].style.color = "#c00";
                email[3].innerText = "enter a valid email address";
                email[3].style.color = "#c00";
                email[3].style.fontSize = "0.9rem";
            }
            return false;
        }
        else {
            if (style === true) {
                email[0].style.color = "#00c851";
                email[1].style.borderBottom = "1px solid #00c851";
                email[1].style.boxShadow = "0 0px 0 0 #fff";
                email[2].style.color = "#00c851";
                email[3].innerText = "";
            }
            return true;
        }
    }

    checkPassword(style) {
        var password = document.getElementById("password").children;
        if (this.state.password.length < 8 || !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{7,25}$/.test(this.state.password))) {
            if (style === true) {
                password[0].style.color = "#c00";
                password[1].style.borderBottom = "1px solid #c00";
                password[1].style.boxShadow = "0 0px 0 0 #fff";
                password[2].style.color = "#c00";
                password[3].innerText = "your password must be at least 8 characters, long uppercase, lowercase, number and special characters";
                password[3].style.color = "#c00";
                password[3].style.fontSize = "0.9rem";
            }
            return false;
        }
        else {
            if (style === true) {
                password[0].style.color = "#00c851";
                password[1].style.borderBottom = "1px solid #00c851";
                password[1].style.boxShadow = "0 0px 0 0 #fff";
                password[2].style.color = "#00c851";
                password[3].innerText = "";
            }
            return true;
        }
    }

    checkConfirmPassword(style) {
        var confirmpassword = document.getElementById("confirmpassword").children;
        if (this.state.confirmPassword !== this.state.password || this.state.confirmPassword.length < 8) {
            if (style === true) {
                confirmpassword[0].style.color = "#c00";
                confirmpassword[1].style.borderBottom = "1px solid #c00";
                confirmpassword[1].style.boxShadow = "0 0px 0 0 #fff";
                confirmpassword[2].style.color = "#c00";
                confirmpassword[3].innerText = "your password does not match";
                confirmpassword[3].style.color = "#c00";
                confirmpassword[3].style.fontSize = "0.9rem";
            }
            return false;
        }
        else {
            if (style === true) {
                confirmpassword[0].style.color = "#00c851";
                confirmpassword[1].style.borderBottom = "1px solid #00c851";
                confirmpassword[1].style.boxShadow = "0 0px 0 0 #fff";
                confirmpassword[2].style.color = "#00c851";
                confirmpassword[3].innerText = "";
            }
            return true;
        }
    }

    disableSubmitButton() {
        if (this.checkEmail(false) && this.checkPassword(false) && this.checkConfirmPassword(false)) {
            document.getElementById("signup").disabled = false;
        } else {
            document.getElementById("signup").disabled = true;
        }
    }

    handleChangeEmail(event) {
        this.state.email = event.target.value;
        this.checkEmail(true);
        this.disableSubmitButton();
    }

    handleChangePass(event) {
        this.state.password = event.target.value;
        this.checkPassword(true);
        this.disableSubmitButton();
    }

    handleChangeConfirmPass(event) {
        this.state.confirmPassword = event.target.value;
        this.checkConfirmPassword(true);
        this.disableSubmitButton();
    }

    //change notification text and color
    notifState(type,message){
        var notif = document.getElementById("notif");
        notif.innerHTML = message;
        notif.className = "btn btn-"+type;
        notif.style.display = "block";
        notif.style.opacity = 1;
        setTimeout(() => {
        var fadeEffect = setInterval(function () {
                if (!notif.style.opacity) {
                    notif.style.opacity = 1;
                }
                if (notif.style.opacity < 0.1) {
                    clearInterval(fadeEffect);
                } else {
                    notif.style.opacity -= 0.1;
                }
            }, 200);
        },1000);
    }

    handleSubmit(event) {
        if (this.checkEmail() && this.checkPassword() && this.checkConfirmPassword()) {
            event.preventDefault();
            axios.post("http://localhost:4200/users/signup", {
                email: this.state.email,
                password : this.state.password,
            })
            .then(res => {
            if(res.data.success){
                this.notifState("success",res.data.message) ;
                window.location = "/user-login" ;
            }else{
                this.notifState("warning",res.data.message) ;
            }
            })
            .catch(err => {
            this.notifState("danger","Internal error plz try again later");
            });
        }
    }


    render() {
        return (
            <div className="container">
                <div className="container cardcontainer userregistration  animated bounceInLeft" id="form">
                    <div className="row justify-content-center">
                        <div className="card col-lg-5 col-sm-8 col-md-8">
                            <form className="card-block" onSubmit={this.handleSubmit}>
                                <div className="form-header elegant-color-dark">
                                    <h3> Register</h3>
                                </div>

                                <div className="md-form" id="mail">
                                    <i className="fa fa-envelope prefix"/>
                                    <input type="text" id="form3" className="form-control"
                                        onChange={this.handleChangeEmail}/>
                                    <label id="form2">Your email</label>
                                    <p></p>
                                </div>
                                <div className="md-form" id="password">
                                    <i className="fa fa-lock prefix"/>
                                    <input name="firstpass" type="password" id="form4" className="form-control"
                                        onChange={this.handleChangePass}/>
                                    <label id="form4">Your password</label>
                                    <p></p>
                                </div>
                                <div className="md-form" id="confirmpassword">
                                    <i className="fa fa-lock prefix"/>
                                    <input name="confirmpass" type="password" id="form5" className="form-control"
                                        onChange={this.handleChangeConfirmPass}/>
                                    <label id="form4">Confirm password</label>
                                    <p></p>
                                </div>

                                <div className="text-center">
                                    <button className="btn waves-effect waves-light elegant-color-dark" type="submit"
                                            id="signup" disabled>Sign up
                                    </button>
                                    <Link to="/user-login">
                                        <button className="btn waves-effect waves-light elegant-color-dark" type=""
                                                id="SignUp">Go to Log In
                                        </button>
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div id="notif" className=""></div>
            </div>
        
        );
    }
}

export default userRegister;