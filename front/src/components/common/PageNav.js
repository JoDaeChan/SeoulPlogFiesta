import styles from './index.module.scss';

// state값에
const PageNav = ({ view, lists, onViewChange }) => {
  return (
    <div className={styles.pageNav}>
      {lists.map((list) => (
        <button
          className={` ${list === view ? styles.activeNav : ''}`}
          onClick={() => {
            onViewChange(list);
          }}
        >
          {list}
        </button>
      ))}
    </div>
  );
};

export default PageNav;