import React from "react"

function ContactSection(){
    function submitHandler(event){
        event.preventDefault()
    }

    return(
        <>
            <section id="Contact" className="scrollspy grey lighten-4" >
                <div className="container">
                    <div className="row">
                    <div className="col s12 m6">
                        <div className="card-panel red darken-3 dark-text center hoverable">
                            <i className="material-icons">email</i>
                            <h5>Contact us</h5>
                            <ul className="collection with-header">
                                <li className="collection-header">
                                    <li className="collection-item"><h4>Location</h4></li>
                                    <li className="collection-item">Name company</li>
                                    <li className="collection-item">City</li>
                                    <li className="collection-item">Location adress</li>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card-panel blue-grey darken-2 white-text hoverable">
                            <h5>Fill this form</h5>
                            <form onSubmit={submitHandler}>
                                <div className="input-field">
                                    <input type="text" placeholder="Name" className="white-text"/> 
                                    <input type="text" placeholder="Email" className="white-text"/> 
                                    <textarea  type="text" placeholder="Enter message" className="white-text materialize-textarea"/> 
                                    <button className="btn waves-effect waves-light  red darken-3 " type="submit">Send</button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactSection