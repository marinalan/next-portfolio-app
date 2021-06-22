import {useState, useRef }  from 'react';
import { Container, Row, Col } from 'reactstrap';
import Typed from "react-typed";
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from "@/components/BasePage";
//import { useGetUser } from '@/actions/user';
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react/cjs/react.development';

const roles = ["Developer", "Tech Lover", "Team Player", "React JS", "Angular"];
const Index = () => {
	const [isFlipping, setIsFlipping] = useState(false);
  const { user, error, isLoading } = useUser();
  //const { data, error, loading } = useGetUser();
	const flipInterval = useRef();

	useEffect(() => {
		startAnimation();
		return () => flipInterval.current && clearInterval(flipInterval.current)
	}, []);

	const startAnimation = () => {
		flipInterval.current = setInterval(() => {
			setIsFlipping(prevFlipping => !prevFlipping);
		}, 3000);
	};

  return (
    <BaseLayout 
      user={user}
      loading={isLoading}
      navClass="transparent"
      className={`${isFlipping ? 'cover-orange' : 'cover-blue'}`}
		>
			<BasePage 
				indexPage
				title="Next.js Portfolio - Marina Landisberg"
			>
				<div className="main-section">
					<div className="background-image">
						<img src="/images/background-index.png" />
					</div>
					<Container>
						<Row>
							<Col md="6">
								<div className="hero-section">
									<div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
										<div className="front">
											<div className="hero-section-content">
												<h2> Full Stack Web Developer </h2>
												<div className="hero-section-content-intro">
													Have a look at my portfolio and job history.
												</div>
											</div>
											<img className="image" src="/images/section-1.png"/>
											<div className="shadow-custom">
												<div className="shadow-inner"> </div>
											</div>
										</div>
										<div className="back">
											<div className="hero-section-content">
												<h2> Full Stack Web Developer </h2>
												<div className="hero-section-content-intro">
													Have a look at my portfolio and job history.
												</div>
											</div>
											<img className="image" src="/images/section-2.png"/>
											<div className="shadow-custom shadow-custom-orange">
												<div className="shadow-inner"> </div>
											</div>
										</div>
									</div>
								</div>
							</Col>
							<Col md="6" className="hero-welcome-wrapper">
								<div className="hero-welcome-text">
									<h1>
										Welcome to the portfolio website of Filip Jerga.
										Get informed, collaborate and discover projects I was working on through the years!
									</h1>
								</div>
								<Typed
									loop
									typeSpeed={70}
									backSpeed={70}
									strings={roles}
									backDelay={1000}
									loopCount={0}
									showCursor
									className="self-typed"
									cursorChar="|"
								/>  
								<div className="hero-welcome-bio">
									<h1>
										Let's take a look on my work.
									</h1>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</BasePage>
    </BaseLayout>
  )
}

export default Index;
