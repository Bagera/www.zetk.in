import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Footer from './Footer';
import GoogleAnalytics from './misc/GoogleAnalytics';
import Header from './header/Header';
import { organization } from '../store/orgs';


@injectIntl
@connect(state => ({ fullState: state }))
export default class App extends React.Component {
    componentDidMount() {
        if (location.hostname.indexOf('dev.zetkin.org') >= 0
            && process.env.NODE_ENV == 'production') {
            let msg = this.props.intl.formatMessage(
                { id: 'misc.environmentWarning.message' });

            if (confirm(msg)) {
                location = '//www.zetk.in' + location.pathname;
            }
        }
    }

    render() {
        let path = this.props.location.pathname;
        let stateJson = JSON.stringify(this.props.fullState);
        let showContinueButton = (path == '/' || path == '/register');

        let title = 'Zetkin';

        if (this.props.params.orgId) {
            let org = organization(this.props.fullState, this.props.params.orgId);
            if (org) {
                title = org.get('title') + ' | ' + title;
            }
        }

        return (
            <html>
                <head>
                    <meta name="viewport"
                        content="width=device-width, initial-scale=1"/>
                    <script src="https://use.typekit.net/tqq3ylv.js"></script>
                    <script>{"try{Typekit.load({ async: true })}catch(e){}"}</script>
                    <title>{ title }</title>
                    <script src="/static/main.js"></script>
                    <link rel="stylesheet" href="/static/css/style.css"/>
                    <link rel="icon" type="image/png"
                        href="/static/images/favicon.png"/>
                </head>
                <body>
                    <Header
                        currentPath={ this.props.location.pathname }
                        showContinueButton={ showContinueButton }/>
                    <div className="App-content">
                        { this.props.children }
                    </div>
                    <Footer />
                    <script type="text/json"
                        id="App-initialState"
                        dangerouslySetInnerHTML={{ __html: stateJson }}/>
                    <GoogleAnalytics/>
                </body>
            </html>
        );
    }

    onClick() {
        const dispatch = this.props.dispatch;
        const msg = (this.props.message == 'Hello world!')?
            'Goodbye world' : 'Hello world!';

        dispatch(setMessage(msg));
    }

    static contextTypes = {
        store: React.PropTypes.object.isRequired
    }
}
