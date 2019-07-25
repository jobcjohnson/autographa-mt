import React, { Component } from 'react';
import ComponentHeading from './ComponentHeading';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

const ReactMarkdown = require('react-markdown/with-html');

const styles = theme => ({
    root: {
        display:'flex',
        flexGrow: 1,
      },
      tokenList: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 360,
        overflowX: 'hidden',
        overflowY: 'auto',
        backgroundColor: '#fff',
      },
      containerGrid: {
        width: '97%',
        marginLeft: '2%',
        marginRight: '2%',
        border: '1px solid #3e51b5',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        height: '100%',
        backgroundColor: '#fff',
      },
});


class TranslationNotes extends Component {
    state = {
        translationNotes: 'Select Concordance to Fetch Notes',
        currentRefse: ''
    }


    async getTranslationNotes(book, chapter, verse){
        try{
            console.log('https://git.door43.org/api/v1/repos/BCS-EXEGETICAL/hi_tN/raw/Content%2F' + book.toUpperCase() +  '%2F' + chapter + '%2F' + verse + '.md')
            const data = await fetch('https://git.door43.org/api/v1/repos/BCS-EXEGETICAL/hi_tN/raw/Content%2F' + book.toUpperCase() +  '%2F' + chapter + '%2F' + verse + '.md', {
                method:'GET',
                header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
              })
            const result = await data.text()
            this.setState({translationNotes:result, currentRef: this.props.reference})
        }
        catch(ex){
            console.log('No data')
            console.log(ex)
            this.setState({translationNotes:"No Data available"})
        }
    }

    componentWillReceiveProps(nextProps){
        const { reference, verseNum } = nextProps
        const { currentRef } = this.state
        
        if(reference && currentRef !== reference){
            const { book, chapter, verse } = verseNum
            this.getTranslationNotes(book, chapter, verse)
        }else{
            this.setState({translationNotes: 'Select Concordance to Fetch Notes'})
        }
    }
    
    displayTranslationNotes = () => {
        // this.getApiData()
        const { translationNotes } = this.state
        // if(translationNotes){
            return (
                <ReactMarkdown
                source={translationNotes}
                escapeHtml={true}
                />
            )
        // }
    }
    render() {
        console.log("notes", this.props)
        const { classes } = this.props
        return (
            <Grid item xs={12} className={classes.containerGrid}>
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        <ComponentHeading data={{
                            classes: classes,
                            text: "Translation Notes"
                        }} />
                    </Grid>
                    <Grid item xs={12} className={classes.tokenList}>
                        {this.displayTranslationNotes()}
                        {/* {this.testGit()} */}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reference: state.sources.reference,
        verseNum: state.sources.verseNum
    }
}

export default connect(mapStateToProps)(withStyles(styles)(TranslationNotes))