import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Image, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";
import { useRouter } from "next/router";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const Home = ({ api_key }) => {
	const route = useRouter();
	const [topCities, setTopCities] = useState([]);
	const [topCityError, setTopCityError] = useState("");
	const [topCityLoading, setTopCityLoading] = useState(false);

	// get 50 city current weather info
	const handleToCitiesWeather = async api_key => {
		try {
			setTopCityError("");
			setTopCityLoading(true);
			const { data } = await axios.get(
				`https://dataservice.accuweather.com/currentconditions/v1/topcities/50?apikey=${api_key}`
			);

			setTopCities(data);
			setTopCityLoading(false);
		} catch (error) {
			setTopCityError(error.message);
			setTopCityLoading(false);
		}
	};

	useEffect(() => {
		handleToCitiesWeather(api_key);
	}, [api_key]);

	const handleRoute = cityName => {
		route.push(`/forecast/${cityName}`);
	};

	return (
		<>
			<h1 className="text-center my-4">Major Cities Weather</h1>
			{topCityLoading ? (
				<Loader />
			) : topCityError ? (
				<Message>{topCityError}</Message>
			) : (
				<div>
					<Table
						hover
						striped
						bordered
						responsive
						className="table-sm text-center"
					>
						<thead>
							<tr className="table-primary">
								<th>City</th>
								<th>Country</th>
								<th>Temperature</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{topCities.map(city => (
								<tr
									key={city.Key}
									style={{ cursor: "pointer" }}
									className="table-primary"
									onClick={() => handleRoute(city.EnglishName)}
								>
									<td>{city.EnglishName}</td>
									<td>{city.Country.EnglishName}</td>
									<td>{city.Temperature.Metric.Value}℃</td>
									<td>
										{city.WeatherIcon ? (
											<Image
												src={`/assets/${city.WeatherIcon}.png`}
												alt={city.WeatherIcon}
												fluid="true"
												style={
													!city.IsDayTime
														? { backgroundColor: "#111938" }
														: { backgroundColor: "skyblue" }
												}
											/>
										) : null}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			)}
		</>
	);
};

export const getStaticProps = () => {
	const api_key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

	return {
		props: {
			api_key,
		},
	};
};

export default Home;
