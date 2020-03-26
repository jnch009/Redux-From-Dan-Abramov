import { setFilter } from "../../actions/actionCreatorsTodoList";
import { connect } from "react-redux";
import Link from "../presentational/Link";

const mapFilterLinkStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visiblityFilter,
    children: ownProps.children
  };
};
const mapFilterLinkDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(setFilter(ownProps.filter))
  };
};
const FilterLink = connect(
  mapFilterLinkStateToProps,
  mapFilterLinkDispatchToProps
)(Link);

export default FilterLink;
