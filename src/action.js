const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const { context } = github;
  const { commits } = context.payload;
  core.setOutput('valid', true);

  try {
    // 'domains' input defined in action metadata file
    const domains = core.getInput('domains').split(';');
    console.log(`📒 All commit author emails must match the following domain(s): ${domains.join(', ')}`);

    // Iterate over each commit and match the author email
    commits.forEach((commit) => {
      const authorEmail = commit.author.email;
      const domain = authorEmail.split('@')[1];

      console.log(`--> ${authorEmail}`);

      if (!domains.includes(domain)) {
        core.setFailed(`❌ ${authorEmail} does not match any of the domains(s) ${domains.join(', ')}`);
        core.setOutput('valid', false);
      }
    });
  } catch (exception) {
    core.setFailed(exception.message);
  }
}

run();
