
import { render, screen } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import App from '../../App';

describe('<HomeBooksScreen />', () => {

    let rootComp: any;
    beforeEach(() => {
        rootComp = render(<App />);
    });

    // it('Should render Home', () => {
    //     const rootJson = rootComp.toJSON();
    //     console.log(rootJson.children[0].children);
    //     expect(rootComp).toBeDefined();
    // });

    it('Should render Books', async () => {
        expect(rootComp).toBeDefined();
        console.log(await screen.findByTestId('AddScreen'));
    });

});