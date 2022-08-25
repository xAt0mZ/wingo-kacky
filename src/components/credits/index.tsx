type Props = {
  selectedTab: string | null;
};

export function Credits({ selectedTab }: Props) {
  return (
    <div className="d-flex justify-content-center align-items-center mb-3">
      <span className="fw-lighter fst-italic">
        Site par{' '}
        <a href="https://github.com/xat0mz" className="text-info text-decoration-none">
          xAt0mZ
        </a>
      </span>
      {(selectedTab === 'leaderboard' || selectedTab === 'maps') && (
        <>
          <span className="ps-1 fw-lighter fst-italic">
            / map IDs par{' '}
            <a href="https://github.com/ibaraki-douji" className="text-info text-decoration-none">
              Ibaraki Douji
            </a>
          </span>
          <span className="ps-1 fw-lighter fst-italic">
            / data par{' '}
            <a href="https://trackmania.io/" className="text-info text-decoration-none">
              trackmania.io
            </a>
          </span>
        </>
      )}
    </div>
  );
}
