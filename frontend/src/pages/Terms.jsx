import React from "react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
    const navigate = useNavigate()
    return (
        <div className="app-container">
            <div className="page-container max-w-7xl mx-auto px-4 sm:px-10">
                <div className="page-header">
                    <h1>Privacy Policy</h1>
                    <button
                        className="btn btn-secondary mx-auto sm:mx-0"
                        onClick={() => navigate("/")}
                    >
                        ← Back to main page
                    </button>
                </div>

                <div className="card my-8 p-5">
                    <p className=''>
<b>Effective Date: 18/06/2026</b>
<br />
<b>Last Updated: 18/06/2026</b>
<br /><br />
These Terms of Service ("Terms") govern your access to and use of the Saal website, platform, and related services (collectively, the "Service").
<br />
By registering to or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
<br /><br />
<b>1. Nature of the Service</b>
<br />
&nbsp;Saal is an independent, experimental project and placeholder service. It is not intended for commercial enterprise, secure data storage, or mission-critical operations. The Service is subject to change, suspension, or termination at any time without prior notice.
<br /><br />
<b>2. User Conduct and Acceptable Use</b>
<br />
While interacting with the Service, you agree not to use it for any unlawful or prohibited purpose. You explicitly agree NOT to:
<br />
&nbsp;&nbsp;&nbsp;Submit Sensitive Data: In accordance with our Privacy Policy, you must not submit personally identifiable information (PII), financial data, or sensitive credentials. Doing so is a direct violation of these Terms.
<br />
&nbsp;&nbsp;&nbsp;Disrupt the Service: You may not attempt to interfere with, degrade, or compromise the integrity or security of the Service, its servers, or its underlying infrastructure (e.g., via DDoS attacks, exploiting vulnerabilities, or uploading malicious code).
<br />
&nbsp;&nbsp;&nbsp;Engage in Illegal Activity: You may not use the Service to transmit or display content that is illegal, abusive, harassing, defamatory, or violates the intellectual property rights of others.
<br /><br />
<b>3. Account and Data Deletion</b>
<br />
&nbsp;Because this is an experimental placeholder service, we reserve the right to modify, suspend, or delete any user profiles, generated data, or accounts at our sole discretion, at any time, and for any reason, without notice or liability. You should not rely on the Service to store or retain any information you input.
<br /><br />
<b>4. Disclaimer of Warranties</b>
<br />
&nbsp;The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Saal makes no representations or warranties of any kind, express or implied, regarding the operation, availability, or functionality of the Service.
<br />
&nbsp;We explicitly disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Service will be uninterrupted, secure, or free of errors or viruses.
<br /><br />
<b>5. Limitation of Liability</b>
<br />
To the maximum extent permitted by applicable law, in no event shall Saal, its creators, developers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
<br />
&nbsp;&nbsp;&nbsp;Your access to or use of (or inability to access or use) the Service.
<br />
&nbsp;&nbsp;&nbsp;Any unauthorized access to or alteration of your transmissions or data.
<br />
&nbsp;&nbsp;&nbsp;Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Service by any third party.
<br /><br />
<b>6. Intellectual Property</b>
<br />
&nbsp;The original code, design, features, and functionality of the Service are and will remain under the copyleft clauses of the <a href="https://www.gnu.org/licenses/gpl-3.0.html">GNU General Public License (GPL) v3.0</a>.
<br />
&nbsp;A copy of the code will remain accesible at <a href="https://github.com/THElib03/proyecto">github.com/THElib03/proyecto</a>.
<br /><br />
<b>7. Changes to Terms</b>
<br />
&nbsp;We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
<br /><br />
<b>8. Contact Information</b>
<br />
&nbsp;For any questions regarding these Terms, please contact us at:
<br />
Email: <a href="mailto:marinvilchesmartin@gmail.com">marinvilchesmartin@gmail.com</a>
                    </p>
                </div>
        </div>
    </div>
    )
}

export default Terms;
