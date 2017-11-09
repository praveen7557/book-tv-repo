import React, { Component } from 'react';
import { fetchTvShows } from '../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class TVBox extends Component {
    constructor(props) {
        super(props);
        this.renderBox = this.renderBox.bind(this);
    }

    componentWillMount() {
        this.props.fetchTvShows(this.props.match.params.id);
    }

    componentDidMount() {
        var titleTxt = (this.props.match.params.id == undefined ? "" : " - " + this.props.match.params.id);
        document.title = "TV Shows" + titleTxt.toUpperCase();
    }

    renderGenres(boxData) {
        const ids = boxData.genre_ids;
        const genres = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }];
        var genreTextArr = [];
        ids.map(function (i) {
            var item = genres.filter(function (e) {
                return e.id == i
            });
            item.length > 0 ? genreTextArr.push(item[0].name) : "";
        });
        // if (this.props.comments["tv:" + boxData.id].indexOf("dnf") > -1) {
        //     genreTextArr.push("DNF");
        // }
        return genreTextArr.join(", ");
    }

    renderDesc(boxData) {
        return (
            <div>
                <div title={boxData.original_name} className="MT15">
                    <a href={"https://www.themoviedb.org/tv/" + boxData.id}>
                        {boxData.original_name}
                    </a>
                </div>
                <div className="FS08 MT05">{boxData.vote_average} (Show Rating)</div>
                {
                    // <div className="FS08 MT05"> {this.props.comments["tv:" + boxData.id].replace("_dnf", "")} ( My Rating )</div>
                    boxData.account_rating != undefined ?
                        <div className="FS08 MT05">{boxData.account_rating.value} (My Rating)</div> : (this.props.match.params.id == "dnf" ? <div className="FS08 MT05"> {this.props.comments["tv:" + boxData.id].replace("_dnf", "")} (My Rating)</div> : "")
                }
                {
                    <div className="FS08 MT05">{this.renderGenres(boxData)}</div>
                }
                {
                    <div className="FS08 MT05">
                        Date Aired : {new Date(boxData.first_air_date).toDateString()}
                    </div>
                }
                <div className="FS08 MT05 desc" dangerouslySetInnerHTML={{ __html: boxData.overview }}></div>
            </div>
        )
    }

    renderBox(boxData, i) {
        return (
            <div className={`box container ${i % 2 == 1 ? "alternateBox" : ""}`} key={boxData.id}>
                <div className="row H100">
                    <div className="col-lg-5 col-sm-2 col-4">
                        {i % 2 == 1 ? this.renderDesc(boxData) : ""}
                    </div>
                    <div className="col-lg-2 col-sm-6 col-4">
                        <div className="imgContainer">
                            <a href={"https://www.themoviedb.org/tv/" + boxData.id}>
                                <img src={"https://image.tmdb.org/t/p/w300_and_h450_bestv2" + boxData.poster_path} alt={boxData.original_name} />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-5 col-sm-2 col-4">
                        {i % 2 == 0 ? this.renderDesc(boxData) : ""}
                    </div>
                </div>
                <div className="boxSeparator"></div>
            </div>
        );
    }

    render() {
        console.log(this.props.shows);
        return (this.props.shows.length > 0) ? (
            <div>
                {this.props.shows.map(this.renderBox)}
            </div>
        ) : (
                <span>Loading shows...</span>
            );
    }
}

function mapStateToProps(state) {
    console.log(state.shows);
    var showRet = (state.shows.length == 0 ? state.shows : state.shows[0].results);
    var comments = (state.shows.length == 0 ? state.shows : state.shows[0].comments);
    const page = (state.shows.length == 0 ? 1 : state.shows[0].page);
    return { shows: showRet, comments: comments, page: page };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchTvShows }, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TVBox));