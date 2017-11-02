import React, { Component } from 'react';
import { fetchBooks } from '../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Box extends Component {
    constructor(props) {
        super(props);
        this.renderBox = this.renderBox.bind(this);
    }

    renderDesc(boxData) {
        return (
            <div>
                <div title={boxData.book.title_without_series} className="MT15">{boxData.book.title_without_series}</div>
                <div className="FS08 MT05">{boxData.book.authors.author.name}</div>
                <div className="FS08 MT05">{boxData.book.average_rating} (Book Ratng)</div>
                {
                    boxData.shelves.shelf.name == "to-read" ? <div className="FS08 MT05">To-Read</div> : <div className="FS08 MT05">{boxData.rating} (My Ratng)</div>
                }

                <div className="FS08 MT05 desc" dangerouslySetInnerHTML={{ __html: boxData.book.description }}></div>
            </div>
        )
    }

    renderBox(boxData, i) {
        return (
            <div className={`box container ${i % 2 == 1 ? "alternateBox" : ""}`} key={boxData.id}>
                <div className="row H100">
                    <div className="col-5">
                        {i % 2 == 1 ? this.renderDesc(boxData) : ""}
                    </div>
                    <div className="col-2">
                        <div className="imgContainer">
                            <a href={boxData.book.link}>
                                <img src={boxData.book.image_url} alt={boxData.book.title_without_series} />
                            </a>
                        </div>
                    </div>
                    <div className="col-5">
                        {i % 2 == 0 ? this.renderDesc(boxData) : ""}
                    </div>
                </div>
                <div className="boxSeparator"></div>
            </div>
        );
    }

    render() {
        console.log(this.props.books);
        return this.props.books.books.length > 0 ? (
            <div>
                {this.props.books.books.map(this.renderBox)}
            </div>
        ) : (
                <span>Loading books...</span>
            );
    }
}

function mapStateToProps(books) {
    return { books };
}

export default connect(mapStateToProps)(Box);