import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import MenuBar from './MenuBar';
import TokenList from './TokenList';
import Concordance from './Concordance';
import TranslationsNotes from './TranslationNotes';
import TranslationsWords from './TranslationWords';
import UpdateTokens from './UpdateTokens';
import { Switch } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Header from './Header';

export default class HomePage extends Component {
    state = {
        language: '',
        version: '',
        book: '',
        // tokenList: '',
        token: '',
        // concordance: '',
        targetLanguage: 'abau',
        sourceId: '',
        targetLanguageId: 20,
        translationWords: '',
        tNswitchChecked: false,
        tWswitchChecked:false,
        tokenPane: 3,
        translationPane: 4,
        concordancePane: 5,
        displayConcordancePane:'block',
        translationWordsPane: 4,
        displayTranslationWords: 'none',
        translationNotesPane: 3,
        displayTranslationNotes: 'none',
        // translationNotes: '',
        displayTranslationWordSwitch: 'none',
        // tokenTranslation:'',
        // senses:[],
        verseNum: '',
        reference: ''
    }

    updateState = (value) => {
        console.log('updating home states')
        this.setState(value)
    }
    
    handleTNSwitchChange = e => {
        const { tNswitchChecked } = this.state
        if (tNswitchChecked) {
            this.setState({
                tNswitchChecked: !tNswitchChecked,
                tokenPane: 3,
                translationPane: 4,
                concordancePane: 5,
                displayTranslationNotes: 'none',
                displayTranslationWordSwitch: 'none',
                displayTranslationWords:'none',
                displayConcordancePane:'block',
                tWswitchChecked:false

            })
        } else {
            this.setState({
                tNswitchChecked: !tNswitchChecked,
                tokenPane: 2,
                translationPane: 3,
                concordancePane: 4,
                displayTranslationNotes: 'block',
                displayTranslationWordSwitch: 'block'
            })

        }

    }

    handleTWSwitchChange = e => {
        const { 
            tWswitchChecked,
        } = this.state
        if(!tWswitchChecked){
            this.setState({
                tWswitchChecked:!tWswitchChecked,
                displayConcordancePane:'none',
                displayTranslationWords:'block',
                // displayTranslationWordSwitch:'block'
            })
        }else{
            this.setState({
                tWswitchChecked:!tWswitchChecked,
                displayConcordancePane:'block',
                displayTranslationWords:'none',
                // displayTranslationWordSwitch:'none'
            })
        }
    }

    render() {
        const { classes } = this.props
        // console.log("Notes", this.state.translationNotes)
        console.log("Home STate", this.state)
        const {
            token,
            sourceId,
            tokenPane,
            reference,
            verseNum,
            translationPane,
            concordancePane,
            displayConcordancePane,
            translationWordsPane,
            translationWords,
            translationNotesPane,
            translationNotes,
            displayTranslationWordSwitch
        } = this.state
        return (
            <Grid container item xs={12}>
                {/* <Grid item xs={2}> */}
                <Header />
                <MenuBar />
                <Grid container item xs={12}>
                    <Grid container alignItems="flex-start" justify="flex-end" item xs={7}>
                    </Grid>
                    <Grid container alignItems="flex-start" justify="flex-end" item xs={2}
                    >
                        <Typography variant="subtitle2" color="textSecondary" style={{display: displayTranslationWordSwitch}}>
                            Toggle Translation Words
                        </Typography>
                        <div style={{display: displayTranslationWordSwitch}}>
                            <Switch
                                checked={this.state.tWswitchChecked}
                                onChange={this.handleTWSwitchChange}
                            >
                                Toggle
                            </Switch>
                        </div>
                    </Grid>
                    <Grid container alignItems="flex-start" justify="flex-end" item xs={3}>
                        <Typography  variant="subtitle2" color="textSecondary" >
                            Toggle Translation Helps
                        </Typography>
                        <Switch
                            checked={this.state.tNswitchChecked}
                            onChange={this.handleTNSwitchChange}
                        >
                            Toggle
                        </Switch>
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={tokenPane}>
                        <TokenList />
                    </Grid>
                    <Grid item xs={translationPane}>
                        <UpdateTokens />
                    </Grid>
                    <Grid item xs={concordancePane}
                    style={{display: displayConcordancePane}}
                    >
                        <Concordance />
                    </Grid>
                    <Grid item xs={translationWordsPane} style={{ display: this.state.displayTranslationWords }}>
                        <TranslationsWords />
                    </Grid>
                    <Grid item xs={translationNotesPane} style={{ display: this.state.displayTranslationNotes }}>
                        <TranslationsNotes  />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
