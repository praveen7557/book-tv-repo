import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchTvShows, updateIsBooks } from '../actions/actions';
import './App.css';

class TVBox extends Component {
    constructor(props) {
        super(props);
        this.renderBox = this.renderBox.bind(this);
        this.state = { divs: [] };
        this.hasMore = true;
        this.loadFunc = this.loadFunc.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    componentWillMount() {
        this.props.updateIsBooks(false);
        this.props.fetchTvShows(this.props.match.params.id);
    }

    componentDidMount() {
        var titleTxt = (this.props.match.params.id == undefined ? "" : " - " + this.props.match.params.id);
        document.title = "TV Shows" + titleTxt.toUpperCase();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.match.params.id != this.props.match.params.id) {
            this.props.fetchTvShows(newProps.match.params.id);
        } else
            this.loadFunc(newProps);
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
                        <div className="FS08 MT05">{boxData.account_rating.value} (My Rating)</div> : (this.props.match.params.id == "dnf" ? <div className="FS08 MT05"> {(this.props.comments != undefined) ? this.props.comments["tv:" + boxData.id].replace("_dnf", "") : ""} (My Rating)</div> : "")
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

    loadFunc(params) {
        let count = this.state.divs.length;
        let shows = params == undefined ? this.props.shows : params.shows;
        let maxLength = (shows.length - count) > 15 ? count + 15 : shows.length;
        let moreDivs = [];
        for (let i = count; i < maxLength; i++) {
            moreDivs.push(
                this.renderBox(shows[i], i)
            )
        }
        if (shows.length < count + 15) {
            this.hasMore = false;
        } else {
            this.hasMore = true;
        }
        shows.length == 0 ? this.setState({ divs: [] }) : setTimeout(() => {
            this.setState({ divs: this.state.divs.concat(moreDivs) });
        })
    }

    getItems() {
        return (
            <InfiniteScroll
                next={this.loadFunc}
                hasMore={this.hasMore}
                loader={<div className="loaderDiv">Loading shows</div>}
                endMessage={
                    <p className="endTag" style={{ textAlign: 'center' }}>
                        <a title="Scrol to top" href={this.props.match.url + "#"}><img src={require("../img/jump-up.png")} /></a>
                    </p>
                }>
                {this.state.divs}
            </InfiniteScroll>
        );
    }

    render() {
        console.log(this.props.shows);
        return (this.props.shows.length > 0) ? (
            <div className="App">
                {this.getItems()}
            </div>
        ) : (
                // <div >
                <div className="loaderDiv">Loading Shows</div>
                // {/* <img src={require("../img/Ripple.gif")} alt="Loading Shows ..." /> */ }
                // </div>
            );
    }
}

function mapStateToProps(state) {
    console.log(state.shows);
    var showRet = (state.shows.length == 0 ? state.shows : state.shows.results);
    var comments = (state.shows.length == 0 ? state.shows : state.shows.comments);
    const page = (state.shows.length == 0 ? 1 : state.shows.page);
    return { shows: showRet, comments: comments, page: page };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchTvShows, updateIsBooks }, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TVBox));