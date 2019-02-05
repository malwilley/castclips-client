import * as React from 'react';
import HttpContent from '~/components/HttpContent';
import ClipCard from '~/modules/Clip/ClipCard';
import { connect } from 'react-redux';
import { AppState } from '~/redux/types';
import { thunks } from './redux';
import { ClipState } from './types';

type ClipPageProps = {
  id: string;
};

type ClipPageConnectedProps = ClipPageProps & {
  clipMetadata: ClipState['metadata'];
  fetchClip: (id: string) => void;
};

class EpisodePage extends React.Component<ClipPageConnectedProps> {
  componentDidMount() {
    const { fetchClip, id } = this.props;
    fetchClip(id);
  }

  render() {
    const { clipMetadata } = this.props;
    return (
      <>
        <section className="hero center bg-primary flex flex-column pt2 relative">
          <HttpContent
            renderError={() => <div>error!</div>}
            renderFetching={() => <div>fetching...</div>}
            renderSuccess={({ title }) => <h1>{title}</h1>}
            request={clipMetadata}
          />
          <ClipCard clip={clipMetadata} />
        </section>
        <section className="page-container pt-episodes">
          <h6 className="ml1 mb1">other stuff</h6>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  clipMetadata: state.clip.metadata,
});

const mapDispatchToProps = {
  fetchClip: thunks.fetchClip,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodePage);
