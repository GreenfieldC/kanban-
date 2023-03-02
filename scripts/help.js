'use strict';

const initHelp = async () => {
	await renderHelp(); //! await für spätere event listerns?
	eventListenersBackToSummary();
};

const renderHelp = () => {
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').innerHTML = generateHelpHtml();
};

/* ============
Back to Summary 
==============*/

const eventListenersBackToSummary = () => {
	const backToSummaryBtn = document.getElementById('back-to-summary');
	backToSummaryBtn.addEventListener('click', initSummary);
};

/**
 * @returns {string} html for the help page
 */
const generateHelpHtml = () => {
	return /*html*/ `
    <div class="main-content-inner-container">
        <div class="helpContainer">
            <div class="helpContentContainer">
                <div class="headingHelpContainer">
                    <div class="title">Help</div>
                    <img id="back-to-summary" class="back" src="./assets/icons/back_logo_black.png" alt="back to summary" />
                </div>
                <div class="helpMainContent">
                    <div class="definitionContainer">
                        <h2>What is Join?</h2>
                        <p class="joinDefinition">
                            Join is a classical task management tool with a kanban-board. <br />
                            You can organize your tasks whithin a project or business processes. <br />
                            It is perfectly suitable for working together with your team. <br />
                            Join let you and your team work more efficiently.
                            <br />
                            You have all of your taks in focus und won't miss upcoming deadlines anymore. <br />
                            Start working with Join now!
                        </p>
                    </div>
                    <div class="manualContainer">
                        <h2 class="subheading">How to use it</h2>
                        <div class="stepsManualContainer">
                            <div class="steps">
                                <p>Add a task with title, description and category. Assign the task to other team members of your contact list or invite new contacts.</p>
                            </div>
                            <div class="steps">
                                <p>Check the current status of your tasks in the kanban-board. You can drag and drop your task to change the status. Also it is possible to edit the task details.</p>
                            </div>
                            <div class="steps">
                                <p>Add team members to your contact list to communicate to them fastly. Also you can assign tasks directly to your contacts.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
};
