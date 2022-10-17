import App from '../../App';
import React from 'react';
import { act, create } from 'react-test-renderer';

describe('<AddBookScreen />', () => {

    let rootComp: any;
    beforeEach(() => {
        rootComp = create(<App />).root;
    });

    it('should render AddScreen UiKitten Card Component', async () => {
        expect(rootComp).toBeDefined();

        let nav: any;
        let card: any;
        await act(async () => {
            nav = await rootComp.findByProps({ testID: 'navigation' }).props;
            await nav.onSelect(1);
            card = await rootComp.findByProps({ testID: 'cardAddBook' });
            console.log(card.props);
        });
        expect(card).toBeDefined();
    });

});