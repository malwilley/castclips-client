import * as React from 'react';
import Downshift from 'downshift';
import { HttpRequest } from 'src/types';
import { connect } from 'react-redux';
import { AppState } from 'src/redux/types';

type HomeSearchConnectedProps = {
  suggestions: HttpRequest<string[]>;
};
/*
const HomeSearch: React.FC<HomeSearchProps> = ({ suggestions }) => (
  <Downshift>
    {({ isOpen }) => (
      <div>
        <input />
      </div>
    )}
  </Downshift>
);

const mapStateToProps = (state: AppState) => ({
  suggestions
})

export default connect()(HomeSearch);
*/
