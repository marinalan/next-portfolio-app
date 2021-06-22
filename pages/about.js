import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { Row, Col } from 'reactstrap';
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";

const About = () => {
  const { user, isLoading } = useUser();

	useEffect(() => {
		return () => {
			window.__isAboutLoaded = true;
		}
	})

	const createFadeInClass = () => {
		if (typeof window !== 'undefined') {
			return window.__isAboutLoaded ? '' : 'fadein';
		}		

		return 'fadein';
	}

  return (
    <BaseLayout
      user={user}
      loading={isLoading}
    >
      <BasePage 
				title="About Me - Marina Landisberg"
				className="about-page"
			>
        <Row className="mt-5">
					<Col md="6">
						<div className="left-side">
							<h1 className={`title ${createFadeInClass()}`}>Hello, Welcome</h1>
							<h4 className={`subtitle ${createFadeInClass()}`}>To About Page</h4>
							<p className={`subsubTitle ${createFadeInClass()}`}>Feel free to read short description about me.</p>
						</div>
					</Col>
					<Col md="6">
						<div className={`${createFadeInClass()}`}>
							<p>My name is Marina Landisberg and I am an experienced software engineer and freelance developer. </p>
							<p>
							I have a Master's degree in Mathematics and many years of experience working
							on a wide range of technologies and projects from C/C++ development for 
							automation controllers serving sugar plants, 
							Visual Basic/Delphi server/client applications with extensive Crystal Reports features to
							modern mobile and web applications in React and Angular.
							</p>
							<p>
							Throughout my career, I have acquired advanced technical knowledge and the ability to research,
							quickly become proficient in new frameworks and solve client's problems.
							</p>
						</div>
					</Col>
				</Row>
      </BasePage>
    </BaseLayout>
  )
}

export default About;