import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkupBtn(page, type) {
    const arrow = type === 'next' ? 'right' : 'left';
    return `<button data-goto="${page}" class="btn--inline pagination__btn--${type}">
      <span>Page ${page}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${arrow}"></use>
      </svg>
    </button>`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //console.log(numPages);

    // Page 1, and the are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtn(curPage + 1, 'next');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtn(curPage - 1, 'prev');
    }
    // Other pages
    if (curPage < numPages) {
      return (
        this._generateMarkupBtn(curPage + 1, 'next') +
        this._generateMarkupBtn(curPage - 1, 'prev')
      );
    }

    // Page 1, and the are NO other pages
    return '';
  }
}

export default new PaginationView();
