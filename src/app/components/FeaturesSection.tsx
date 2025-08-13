import { features } from "../constants";
import { Card, CardContent } from "./common/Card";
import Badge from "./common/Badge"

const FeaturesSection = () => {
    return (
    <section className="features">
      <Badge variant="outline">
        Why Choose ArdentIQ?
      </Badge>
      <h2 className="features__title">
        Built for Organizations Like Yours
      </h2>
      <p className="features__description">
        Stop losing time searching through documents. Get instant, accurate answers from your knowledge base with our AI-powered retrieval system.
      </p>

      <div className="features__grid">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="features__card-content">
              <div className="features__card-content__icon">
                {feature.icon}
              </div>
              <h3 className="features__card-content__title">{feature.title}</h3>
              <p className="features__card-content__description">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
    )
}

export default FeaturesSection;