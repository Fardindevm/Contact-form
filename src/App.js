import './App.css';
import { useState } from 'react';
import { useRef } from 'react';
import validator from "validator";
import Success from './components/Success'
import $ from 'jquery'

function App() {
  
  const [successShow, setSuccessShow] = useState(false)
  const [query, setQuery] = useState(null)
  const [error, setError] = useState({})
  const firstRadioRef = useRef(null);
  const secondRadioRef = useRef(null);
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};

    if(!e.target.firstName.value.trim()) {
      newError.firstName = "This field is required"
    }
    if(!e.target.lastName.value.trim()) {
      newError.lastName = "This field is required"
    }
    
    if(!e.target.email.value.trim() || !validator.isEmail(e.target.email.value)) {
      newError.email = "Please enter a valid email address"
    }

    if (!query) {
      newError.query = "Please select a query type"
    }

    if (!e.target.message.value.trim()) {
      newError.message = "This field is required"
    }

    if (!consent) {
      newError.consent = "To submit this form, please consent to being contacted"
    }

    if (Object.keys(newError).length > 0) {
      setError(newError)
      setSuccessShow(false)
      $(".App").css({
        'transition': 'margin-top 0.5s ease-in'
      })
      $(".App").removeClass("margin-top")
    } else {
      setError({})
      reset();
      setSuccessShow(true)
      setTimeout(() => {
        setSuccessShow(false);
        $(".App").css({
          'transition': 'margin-top 0.5s ease-in'
        })
        $(".App").removeClass("margin-top")
      }, 11000)
    }

    console.log(newError)
  }

  const adjustHeight = (element) => {
    
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  };

  const handleGetId = (e, ref) => {
    const parent = ref.current;
    handleQueryChange(e.target.id)

    if (e.target.checked) {
      parent.style.background = "#e0f1e7";
      parent.style.border = "2px solid hsl(169, 82%, 27%)";
      parent.style.transition = "background .1s ease-in";
      
      const otherRef = ref === firstRadioRef ? secondRadioRef : firstRadioRef;
      const otherParent = otherRef.current;

      otherParent.style.background = "none";
      otherParent.style.border = "1px solid hsl(186, 15%, 59%)";
      otherParent.style.transition = "none";
    }
  }
  
  const handleQueryChange = (querys) => {
    setQuery(querys)
  }

  const handleConsent = (e) => {
    setConsent(e.target.checked) 
  }

  const reset = () => {
      $("input").val("");
      $("textarea").val("")
      setConsent(false);
      setQuery(null); 

      $("#first-radio").css({
        "background-color": "",
        "border": ""
      });
      $("#second-radio").css({
        "background-color": "",
        "border": ""
      });
    }
  // console.log(element)
  return (
    <div className='App-container'>
    <form className="App" onSubmit={(e) => handleSubmit(e)}>
      <h2>Contact Us</h2>
      <fieldset className='Name'>
        <label className="label">First Name <span className='asterisk'>*</span>
          <input type='text' className={`FirstName input ${error.firstName ? 'parent-error' : ''}`} name='firstName'/>
          {error.firstName && <span className='error'>{error.firstName}</span>}
        </label>
        <label className="label">Last Name <span className='asterisk'>*</span>
          <input type='text' className={`LastName input ${error.lastName ? 'parent-error' : ''}`} name='lastName'/>
          {error.lastName && <span className='error'>{error.lastName}</span>}
        </label>
      </fieldset>
      <label className="label">Email Address <span className='asterisk'>*</span>
        <input type='text' className={`input ${error.email ? 'parent-error' : ''}`} name='email'/>
        {error.email && <span className='error'>{error.email}</span>}
      </label>
      <fieldset>
        <label className='label space'>Query Type <span className='asterisk'>*</span></label>
        <div className='Name'>
          <div className='radio' id="first-radio" ref={firstRadioRef}>
            <input 
              type='radio'
              className='circular-checkbox' 
              name="checkbox" 
              value="General" 
              id="General Enquiry" 
              checked={query === 'General Enquiry'} 
              onChange={(e) => handleGetId(e, firstRadioRef)}
              />
            <label className='query' htmlFor='General Enquiry'>General Enquiry</label>
          </div>
          <div className='radio' id="second-radio" ref={secondRadioRef}>
            <input 
              type='radio' 
              className='circular-checkbox' 
              name="checkbox" 
              value="check" 
              id="Support Request" 
              checked={query === 'Support Request'} 
              onChange={(e) => handleGetId(e, secondRadioRef)}
              />
            <label className='query' htmlFor='Support Request'>Support Request</label>
          </div>
        </div>
        {error.query && <span className='error'>{error.query}</span>}
      </fieldset>
      <label className="label">Message <span className="asterisk">*</span>
      <textarea 
        rows="5" 
        maxLength="585"
        onInput={(e) => adjustHeight(e.target)}
        name='message'
        className={error.message ? 'parent-error' : ''}
      >
      </textarea>
      {error.message && <span className='error'>{error.message}</span>}
      </label>
      <div style={{margin: "1.3rem 0"}}>
        <div className='teamwork-acception'>
          <input 
            className="agreement"
            type='checkbox'
            id="agree"
            name='consent'
            checked={consent}
            onChange={handleConsent}/>
          <label htmlFor='agree' className='consent'>I consent to being contacted by the team <span className='asterisk'>*</span></label>
      </div>
      {error.consent && <span className='error consent'>{error.consent}</span>}
      </div>
      <button className='submit' type='submit'>Submit</button>
    </form>
    {successShow && <Success />}
    </div>
  );
}

export default App;
