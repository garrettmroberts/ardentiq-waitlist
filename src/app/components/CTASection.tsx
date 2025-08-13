import EmailForm from "./EmailForm"

const CTASection = () => {
    return (
    <section className="cta">
      <div className="cta__content">
        <h2 className="cta__title">
          Ready to Transform Your Knowledge Management?
        </h2>
        <p className="cta__description">
          Join hundreds of forward-thinking organizations already on our waitlist. Be the first to experience the future of document intelligence.
        </p>
        
        <EmailForm 
          buttonText="Get Early Access" 
        />
      </div>
    </section>  
    )
}

export default CTASection