import React, { Component } from 'react';
import { fetchBooks } from '../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class Box extends Component {
    constructor(props) {
        super(props);
        this.renderBox = this.renderBox.bind(this);
        console.log(props);
    }

    componentWillMount() {
        this.props.fetchBooks(this.props.match.params.id);
    }

    componentDidMount() {
        var titleTxt = (this.props.match.params.id == undefined ? "" : " - " + this.props.match.params.id);
        document.title = "Books" + titleTxt.toUpperCase();
    }

    renderDesc(boxData) {
        return (
            <div>
                <div title={boxData.book.title_without_series} className="MT15">
                    <a href={boxData.book.link}>
                        {boxData.book.title_without_series}
                    </a>
                </div>
                <div className="FS08 MT05 sasa">
                    <a href={boxData.book.authors.author.link}>
                        {boxData.book.authors.author.name}
                    </a>
                </div>
                <div className="FS08 MT05">{boxData.book.average_rating} (Book Rating)</div>
                {
                    (boxData.rating == 0 ? ((boxData.shelves.shelf).length > 0 ? <div className="FS08 MT05">{boxData.shelves.shelf[0].name}</div> : (boxData.shelves.shelf.name == "to-read" ? <div className="FS08 MT05">to-read</div> : "")) : <div className="FS08 MT05">{boxData.rating} (My Rating)</div>)
                }
                {
                    (boxData.started_at == null) ? (<div className="FS08 MT05">Date Added : {new Date(boxData.date_added).toDateString()}</div>) : <div className="FS08 MT05">{(new Date(boxData.started_at).toDateString() + " - " + (boxData.read_at == null ? "" : new Date(boxData.read_at).toDateString()))}</div>
                }
                <div className="FS08 MT05 desc" dangerouslySetInnerHTML={{ __html: boxData.book.description }}></div>
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
                            <a href={boxData.book.link}>
                                <img src={boxData.book.image_url} alt={boxData.book.title_without_series} />
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
        console.log(this.props.books);
        return (this.props.books.books.length > 0 || this.props.books.books.id != undefined) ? (
            <div>
                {this.props.books.books.length > 0 ? this.props.books.books.map(this.renderBox) : this.renderBox(this.props.books.books, 0)}
            </div>
        ) : (
                <div className="loaderDiv">
                    <img src={require("../img/Ripple.gif")} alt="Loading Books ..." />
                </div>
            );
    }
}

function mapStateToProps(books) {
    return { books };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBooks }, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Box));