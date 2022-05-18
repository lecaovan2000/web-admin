import React, { PureComponent } from 'react';

class SearchBar extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            clearInput: 'hide',
        }
        this.refSearchInput = null;
    }
    handleChange = (e) => {
        this.setState({ value: e.target.value });
        if ((e.target.value !== null) && (e.target.value !== '')) {
            this.setState({
                clearInput: 'clear-input',
            })
        }
        if ((e.target.value === null) || (e.target.value === '')) {
            this.setState({
                clearInput: 'hide',
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.props.handleSearch) {
            this.props.handleSearch(this.state.value)
        }
        this.refSearchInput.blur();
    }

    clear = async () => {
        await this.setState({
            value: '',
            clearInput: 'hide',
        })
        this.props.handleSearch(this.state.value)
    }

    setRefInput = (r) => {
        this.refSearchInput = r;
    }

    render() {
        return (
            <div className="search-comp">
                <form className="input-label" onSubmit={this.handleSubmit}>
                    <input
                        ref={this.setRefInput}
                        className="input"
                        placeholder={this.props.placeholder}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </form>
                <div className={this.state.clearInput} onClick={this.clear}></div>
            </div>
        );
    }
}

export default SearchBar;