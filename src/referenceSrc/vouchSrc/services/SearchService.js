

import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';



function SearchService(
  searchedQuery,
  activeHeaderId,
  activeSubHeaderId,
  categoryId,
  isContainTag,
  pageNum
) {
  this.getFeedList = async () => {
    let url = "";
    let updatedQuery = searchedQuery.replace("#", "");
    let activeSH = activeSubHeaderId ? activeSubHeaderId : 1;
    let activeCat = categoryId ? categoryId : "";
    let activePage = pageNum ? pageNum : 1;
    if (activeHeaderId == 3) {
      url =
        VOUCH_API.BASE_URL +
        `search?q=${updatedQuery}&thid=${activeHeaderId}&tag=${isContainTag}&page=${activePage}`;
    } else if (activeHeaderId == 2) {
      url =
        VOUCH_API.BASE_URL +
        `search?q=${updatedQuery}&thid=${activeHeaderId}&page=${activePage}`;
    } else if (activeHeaderId == 1) {
      url =
        VOUCH_API.BASE_URL +
        `search?q=${updatedQuery}&thid=${activeHeaderId}&hid=${activeSH}&cid=${activeCat}&page=${activePage}`;
    }

    let networkService = new NetworkService(url, REQUEST_TYPE.get);
    let response = await networkService.hitNetwork();

    return response;
  };
}

export default SearchService;

