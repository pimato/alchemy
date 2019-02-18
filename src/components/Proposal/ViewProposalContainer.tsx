import * as classNames from "classnames";
import { DiscussionEmbed } from 'disqus-react';
import * as React from "react";
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { Link, Route, RouteComponentProps, Switch } from "react-router-dom";

import ProposalContainer from "./ProposalContainer";
import Subscribe, { IObservableState } from "components/Shared/Subscribe"
import { Address, IDAOState, IProposalState, ProposalStage } from '@daostack/client'

import * as css from "./ViewProposal.scss";
import { arc } from "arc";

interface IProps extends RouteComponentProps<any> {
  proposal: IProposalState
  dao: IDAOState
  currentAccountAddress: Address
}

class ViewProposalContainer extends React.Component<IProps, null> {
  public render() {
    const { proposal, dao, currentAccountAddress } = this.props;

    const disqusConfig = {
      url: process.env.BASE_URL + this.props.location.pathname,
      identifier: proposal.id,
      title: proposal.title
    };

    return(
      <div className={css.viewProposalContainer}>
        <BreadcrumbsItem to={'/dao/' + dao.address + "/proposal" + proposal.id}>{proposal.title}</BreadcrumbsItem>
        <div className={css.proposal}>
          <ProposalContainer proposalId={proposal.id} dao={dao} currentAccountAddress={currentAccountAddress} detailView={true}/>
        </div>
        <h3 className={css.discussionTitle}>Discussion</h3>
        <DiscussionEmbed shortname={process.env.DISQUS_SITE} config={disqusConfig} />
      </div>
    )
  }
}

export default (props: { dao: IDAOState, currentAccountAddress: Address} & RouteComponentProps<any>) => {
  const proposalId = props.match.params.proposalId
  const currentAccountAddress = props.currentAccountAddress
  return <Subscribe observable={arc.dao(props.dao.address).proposal(proposalId).state}>{(state: IObservableState<IProposalState>) => {
      if (state.data) {
        return <ViewProposalContainer {...props} proposal={state.data} currentAccountAddress={currentAccountAddress} />
      } else if (state.error) {
        return <div>{ state.error.message }</div>
      } else {
        return <div>Loading...</div>
      }
    }
  }</Subscribe>
}
