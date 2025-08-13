import Image from "next/image";
import Badge from "./common/Badge";
import EmailForm from "./EmailForm";
import { images } from "../constants";

const HeroSection = () => {
    return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__content__grid">
          <div>
            <Badge>
              AI-Powered Knowledge Management
            </Badge>
              <h1 className="hero__title">
                Transform Your Documents Into 
                <span className="hero__title-gradient"> Intelligent Answers</span>
              </h1>
              
              <p className="hero__title-subtitle">
                Built for small and mid-sized organizations who need enterprise-grade AI document processing without the enterprise complexity.
              </p>

              <EmailForm buttonText="Join Waitlist" />
              <p className="text-sm text-muted-foreground">
                Be the first to know when we launch. No spam, unsubscribe anytime.
              </p>
          </div>

          <div className="hero__image">
            <Image src={images.hero} alt="AI Technology Visualization" width={500} height={500} />
          </div>
        </div>
      </div>
    </section>
    )
}

export default HeroSection;