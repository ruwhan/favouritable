import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Select, Tag, DatePicker, PageHeader, Image } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { TablePaginationConfig, ColumnsType } from "antd/lib/table";

import { Movie } from "../../models/Movie";
import { Genre } from "../../models/Genre";
import { loadDiscoverMovies, loadFavourites, toggleFavourites } from "../../actions/movies-actions";
import { loadGenres } from "../../actions/genres-actions";

const { Option } = Select;
const { RangePicker } = DatePicker;

export class DiscoveryMovies extends React.Component<any, any, any> {
  loadDiscoverMovies: Function;
  loadGenres: Function;
  loadFavourites: () => Promise<number[]>;
  toggleFavourites: (movie: Movie) => Promise<number[]>;

  static propTypes = {
    movies: PropTypes.object
  }

  columns: ColumnsType<Movie> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => (<Link to={`/movie/${text}`}>{text}</Link>)
    },
    { 
      title: 'Poster',
      dataIndex: 'poster_path',
      key: 'poster_path',
      render: (text: string) => { 
        return (
          <Image
            src={`http://image.tmdb.org/t/p/original/${text}`}
            alt="poster"
            width={128}
            fallback="data:image/png;base64,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"
          />) 
      } 
      },
    { 
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          {this.state.favouriteIds.includes(record.id) ? <StarFilled
              style={{ cursor: "pointer", fontSize: "24px", color: "gold" }}
              onClick={() => this.handleClickFavourites(record)} 
          /> : <StarOutlined
              style={{ cursor: "pointer", fontSize: "24px" }}
              onClick={() => this.handleClickFavourites(record)} 
          /> }
            {text}
          </div>
      )
    },
    {
      title: 'overview',
      dataIndex: 'overview',
      key: 'overview'
    },
    {
      title: 'popularity',
      dataIndex: 'popularity',
      key: 'popularity',
    },
    {
      title: 'genre',
      dataIndex: 'genre',
      key: 'genre',
      render: (text, record) => {
        return (this.filterGenres(record.genre_ids).map((item) => <Tag key={item.id}>{item.name}</Tag>))
      }
    },
  ]

  constructor(props: any) {
    super(props);
    this.loadDiscoverMovies = props.loadDiscoverMovies;
    this.loadGenres = props.loadGenres;
    this.loadFavourites = props.loadFavourites;
    this.toggleFavourites = props.toggleFavourites;

    this.state = {
      sortBy: '',
      startReleaseDate: '',
      endReleaseDate: '',
      favouriteIds: []
    }
  }

  componentDidMount() {
    this.loadGenres();
    this.loadDiscoverMovies();
    this.loadFavourites().then((favouriteIds) => {
      this.setState({ favouriteIds })}
    );
  }

  handlePaginationChange = (config: TablePaginationConfig): void => {
    this.loadDiscoverMovies(config.current, this.state.sortBy, this.state.startReleaseDate, this.state.endReleaseDate);
  }

  handleChangeSort = (val: string) => {
    this.setState({
      sortBy: val
    });

    this.loadDiscoverMovies(1, val, this.state.startReleaseDate, this.state.endReleaseDate);
  }

  handleCalendarChange = (dates: any) => {
    if (!dates[0] || !dates[1]) {
      return this.setState({
        startReleaseDate: '',
        endReleaseDate: '',
      });
    }

    this.loadDiscoverMovies(1, this.state.sortBy, dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD'));
  }

  handleClickFavourites = (record: Movie) => {
    this.toggleFavourites(record).then((favouriteIds) => this.setState({ favouriteIds }));
  }

  mapMovies(): Movie[] {
    const { entities } = this.props.movies;
    const { byId, activeIds } = entities;
    return activeIds.map((id: any) => byId[id]);
  }

  filterGenres(ids: number[]): Genre[] {
    const { entities } = this.props.genres;
    
    return entities.ids
        .filter((id: number) => ids.includes(id))
        .map((id: number) => entities.byId[id]);
  }

  render() {
    const { pagination } = this.props.movies;
    const movies = this.mapMovies();
    
    return (
      <div>
        <PageHeader
          title="Discover Movies"
        />
        <h1>Discover Movies</h1>
        <Select defaultValue="" style={{ width: 120 }} onChange={this.handleChangeSort}>
          <Option value="">None</Option>
          <Option value="popularity.desc">Highest Popularity</Option>
          <Option value="popularity.asc">Lowest Popularity</Option>
          <Option value="release_date.desc">Latest Release</Option>
          <Option value="release_date.asc">Oldest Release</Option>
          <Option value="vote_count.desc">Most Voted</Option>
          <Option value="vote_count.asc">Less Voted</Option>
        </Select>
        <RangePicker onCalendarChange={this.handleCalendarChange}></RangePicker>
        <Table
            columns={this.columns}
            key={"id"}
            dataSource={movies}
            pagination={{...pagination, showSizeChanger: false}}
            onChange={this.handlePaginationChange}></Table>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  movies: state.movies,
  genres: state.genres
});

const mapDispatchToProps = {
  loadDiscoverMovies,
  loadGenres,
  loadFavourites,
  toggleFavourites,
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryMovies);
