import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { Descriptions, Image, Tag, PageHeader, Badge } from "antd";
import { ReducerState } from "../../models/ReducerState";
import { loadMovieDetails, navigateToDiscoverMoviesPage } from "../../actions/movies-actions";

interface HomeRouterProps {
  id: string
}

interface MovieDetailsProps extends RouteComponentProps<HomeRouterProps> {
  movies: ReducerState,
  match: any,
}

interface DispatchProps {
  loadMovieDetails: (movieId: number) => void,
  navigateToDiscoverMoviesPage: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

export class MovieDetails extends React.Component<HomeRouterProps & MovieDetailsProps & DispatchProps> {
  loadMovieDetails: Function;
  navigateToDiscoverMoviesPage: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

  constructor(props: HomeRouterProps & MovieDetailsProps & DispatchProps) {
    super(props);
    this.loadMovieDetails = this.props.loadMovieDetails;
    this.navigateToDiscoverMoviesPage = this.props.navigateToDiscoverMoviesPage;
  }

  componentDidMount() {
    this.loadMovieDetails(this.props.match.params.id);
  }

  render() {
    const { movies, match } = this.props;
    const { byId } = movies.entities;
    const movie = byId[match.params.id];

    return(
      <div>
        <PageHeader
          onBack={this.navigateToDiscoverMoviesPage}
          title="Movie Details"
          subTitle="This is a subtitle"
        />
        <h1>{movie && movie.title}</h1>
        {movie && (
          <Descriptions>
            <Descriptions.Item label="">{movie.overview}</Descriptions.Item>
            {/* <Descriptions.Item label="Backdrop"><img src={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="Poster" /></Descriptions.Item> */}
            <Descriptions.Item label=""><Image src={`http://image.tmdb.org/t/p/original${movie.poster_path}`} alt="Poster" width={256} /></Descriptions.Item>
            <Descriptions.Item label="Popularity">{movie.popularity}</Descriptions.Item>
            <Descriptions.Item label="Genre">{movie.genres && movie.genres.map((item:any) => <Tag>{item.name}</Tag>)}</Descriptions.Item>
            <Descriptions.Item label="Release Date">{Intl.DateTimeFormat('en-US', movie.release_date).format()}</Descriptions.Item>
            <Descriptions.Item label="Production Companies">{movie.production_companies && movie.production_companies.map((item:any) => item.name).join(", ")}</Descriptions.Item>
            <Descriptions.Item label="Runtime">{`${Math.round(movie.runtime / 60)}h ${Math.round(movie.runtime % 60)}m`}</Descriptions.Item>
            <Descriptions.Item label="Revenue">{`${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.revenue)}`}</Descriptions.Item>
            <Descriptions.Item label="Vote Average"><Badge>{movie.vote_average}</Badge></Descriptions.Item>
            <Descriptions.Item label="Vote Count">{movie.vote_count}</Descriptions.Item>
            <Descriptions.Item label="Spoken Languages">{movie.spoken_languages && movie.spoken_languages.map((item:any) => <Tag>{item.name}</Tag>)}</Descriptions.Item>
          </Descriptions>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  movies: state.movies,
});

const mapDispatchToProps: DispatchProps = {
  loadMovieDetails,
  navigateToDiscoverMoviesPage,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieDetails));
