function navFunctionality() {
	const sidebar = document.querySelector('.sidebarContainer');
	const sidebarArrow = document.querySelector('.sidebarArrow');
	const viewMenu = document.querySelector('.viewMenu');

	sidebar.addEventListener('mouseout', (e) => {
		sidebarArrow.classList.remove('expandSidebarArrow');
		sidebar.classList.remove('expandSidebar');
		viewMenu.classList.remove('viewMenuExpanded');
	});

	sidebar.addEventListener('mouseover', (e) => {
		sidebarArrow.classList.add('expandSidebarArrow');
		sidebar.classList.add('expandSidebar');
		viewMenu.classList.add('viewMenuExpanded');
	});
}
export default navFunctionality;
