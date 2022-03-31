import React from "react";
import { Card } from "react-bootstrap";

const WeatherCard = ({ weatherInfo, cityInfo }) => {
	return (
		<Card className="p-3" style={{ width: "100%" }}>
			<Card.Header>
				{weatherInfo?.WeatherIcon ? (
					<Card.Img
						src={`/assets/${weatherInfo.WeatherIcon}.png`}
						alt={weatherInfo.WeatherIcon}
						fluid="true"
						style={
							!weatherInfo.IsDayTime
								? { backgroundColor: "#111938" }
								: { backgroundColor: "skyblue" }
						}
					/>
				) : null}
			</Card.Header>
			<Card.Body>
				<div className="text-center">
					<h3>{cityInfo?.EnglishName}</h3>
					<h4>{cityInfo?.Country?.EnglishName}</h4>

					<Card.Text>
						<strong>{weatherInfo?.WeatherText}</strong>
					</Card.Text>
					<Card.Text>
						Temperature: {weatherInfo?.Temperature?.Metric?.Value}℃ &nbsp; or
						&nbsp;
						{weatherInfo?.Temperature?.Imperial?.Value}℉
					</Card.Text>
				</div>
			</Card.Body>
		</Card>
	);
};

export default WeatherCard;
