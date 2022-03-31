import React from "react";
import { Card, Container, Image, Table } from "react-bootstrap";
import Message from "../../components/Message";
import WeatherCard from "../../components/WeatherCard";
import axios from "axios";
import Link from "next/link";

const day = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

const Forecast = ({ error, forecast, weatherInfo, cityInfo }) => {
	// const [error, setError] = useState("");
	// const [loading, setLoading] = useState(false);
	// const [cityInfo, setCityInfo] = useState({});
	// const [weatherInfo, setWeatherInfo] = useState({});

	// const [forecastError, setForecastError] = useState("");
	// const [forecastLoading, setForecastLoading] = useState(false);
	// const [forecastInfo, setForecastInfo] = useState([]);

	// // per city weather info
	// const handleGetWeatherInfo = async cityName => {
	// 	if (!cityName) return;
	// 	try {
	// 		setError("");
	// 		setLoading(true);
	// 		const { data } = await axios.get(
	// 			`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=oC3vfwwa0vwE9UL8MPGJKLHbomkCPs0L&q=${cityName}`
	// 		);
	// 		setCityInfo(data[0]);
	// 		const locationKey = data[0].Key;

	// 		const { data: weather } = await axios.get(
	// 			`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=oC3vfwwa0vwE9UL8MPGJKLHbomkCPs0L`
	// 		);

	// 		const weatherInfo = weather[0];

	// 		setLoading(false);
	// 		setError("");
	// 		setWeatherInfo(weatherInfo);
	// 	} catch (error) {
	// 		setLoading(false);
	// 		setError(error.message);
	// 	}
	// };

	// // get 5 day forecast information
	// const getForecast = async key => {
	// 	try {
	// 		setForecastError("");
	// 		setForecastLoading(true);
	// 		const { data } = await axios.get(
	// 			`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=oC3vfwwa0vwE9UL8MPGJKLHbomkCPs0L`
	// 		);
	// 		setForecastInfo(data);
	// 		setForecastLoading(false);
	// 	} catch (error) {
	// 		setForecastError(error.message);
	// 		setForecastLoading(false);
	// 	}
	// };

	// useEffect(() => {
	// 	if (cityName) {
	// 		handleGetWeatherInfo(cityName);
	// 	}
	// }, [cityName]);

	// useEffect(() => {
	// 	if (cityInfo?.Key) {
	// 		getForecast(cityInfo.Key);
	// 	}
	// }, [cityInfo]);

	return (
		<Container>
			<br />
			<br />
			<br />
			<br />
			<br />
			<div
				className="d-flex justify-content-center align-items-center flex-column my-5"
				style={{ height: "100vh" }}
			>
				<Link href="/" className="my-3">
					<a>Go Back</a>
				</Link>
				<Card className="p-3 text-center">
					<Card.Header>
						<h2 className="text-center">Weather forecast</h2>
					</Card.Header>
					<Card.Body>
						{error ? (
							<Message>{error}</Message>
						) : (
							<>
								<WeatherCard weatherInfo={weatherInfo} cityInfo={cityInfo} />
								<Table
									hover
									striped
									bordered
									responsive
									className="table-sm text-center"
								>
									<thead>
										<tr>
											<th>Date</th>
											<th>Temperature</th>
											<th>Day</th>
											<th>Night</th>
										</tr>
									</thead>
									<tbody>
										{forecast?.DailyForecasts?.map(forecast => (
											<tr key={forecast?.Date}>
												<td>{day[new Date(forecast?.Date).getDay()]}</td>
												<td>
													min: {forecast?.Temperature?.Minimum?.Value}℉, max:{" "}
													{forecast?.Temperature?.Maximum?.Value}℉
												</td>
												<td>
													<Image
														src={`/assets/${forecast.Day.Icon}.png`}
														alt={forecast.Day.Icon}
													/>
												</td>
												<td>
													<Image
														src={`/assets/${forecast.Night.Icon}.png`}
														alt={forecast.Night.Icon}
													/>
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</>
						)}
					</Card.Body>
				</Card>
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
		</Container>
	);
};

export const getServerSideProps = async context => {
	const cityName = context.params.cityName;
	const api_key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
	try {
		const { data: cityInfo } = await axios.get(
			`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_key}&q=${cityName}`
		);
		const locationKey = cityInfo[0].Key;

		const { data: weather } = await axios.get(
			`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${api_key}`
		);

		const { data: forecast } = await axios.get(
			`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${api_key}`
		);
		return {
			props: {
				error: "",
				forecast,
				weatherInfo: weather[0],
				cityInfo: cityInfo[0],
			},
		};
	} catch (error) {
		return {
			props: {
				error: error.message,
			},
		};
	}
};

export default Forecast;
