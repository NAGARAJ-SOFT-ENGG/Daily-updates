import { getCommonImageSource, getCommonInvStatusForDraft, getCommonNablDetails, getCommonTemplateForORGS, getReportTemplate,getMethodNameandSample } from "@/services/common"
import { getClientStatus, getGrpLevelReportGraphs, getImagesForImmulite, getInvestigationForMerged } from "@/services/inv-values-merged"
import { getBarcode, getPatientBiographyNew, PGetGroupNameForFish } from "@/services/mhl-service"
import { getPendingListPendingItems } from "@/services/pending-list"
import { getTablularInterpretationMultiColumnDataset1 } from "@/services/tabluar-interpretation-multi-column"
import { handleAccession, handleImage } from "@/utils/utils"
import React from "react"
import { Page } from "@/components/mhl/page"
import {DataSet1} from '@/services/template90-services'
 

const TEMPLATE_ID = 90;
export default function Template90({ pVisitId, methodNameAndSample, orgId, requiredData, patientDetails, groupNameForFish, barcode, data, accessionNumbers, imageSource, interpretationList, draftStatus, orgs, pendingList, nablData, image, stationary, dataset1Values })  {
 console.log(dataset1Values)

    return (
        <>  
           <Page templateId={49} data={patientDetails.length > 0 ? patientDetails[0] : []} barcode={barcode} image={""} orgs={orgs} pVisitId={pVisitId} inv={imageSource} bgImage={image} imageData={orgs} draftStatus={draftStatus} nablData={nablData} noHeader stationary={stationary}>


                                             {dataset1Values && dataset1Values?.length > 0 && dataset1Values.map((item, index) => 
                                              <React.Fragment key={index}>
                                            {item.patientvisiid ==null && item.outputgroupingcode !== "AFB" &&

                                            <tr style={{ height: '0.23489in' }} className="iip" key={index}>
                                                <td  style={{ padding: '2pt',textAlign:'center' }} colSpan={12}>
                                                    <strong>
                                                        <div className="" dangerouslySetInnerHTML={{ __html: `<br/>${item.NAME}<br/>` }} />
                                                    </strong>
                                                </td>
                                            </tr> 
                                            }       
                                             

                                           {item.patientvisiid !== null && item.patientvisiid > 0 && item.outputgroupingcode !== "AFB" && 
                                            (item.outputgroupingcode === "" || item.outputgroupingcode == null) &&
                                             <tr style={{ height: '0.23489in' }} className="" >
                                           
                                            <td colSpan={2} style={{ padding: '2pt' }}>
                                                <strong>
                                                <div className="" dangerouslySetInnerHTML={{ __html: `<br/>${item.NAME}<br/>` }} />
                                                </strong>
                                                </td>
                                            <td colSpan={3} style={{ padding: '2pt', }} >
                                            <div className="" dangerouslySetInnerHTML={{ __html: `<br/>: ${item.Result}<br/>` }} />
                                            </td>
                                            <td style={{ padding: '2pt' }}>
                                            <div className="">
                                                <br />
                                                {item.Result.split(',').length <= 1 ? ',' : item.Result.split(',')[1]}
                                                <br />
                                            </div>
                                        </td>
                                        </tr>
                                            }


                                           {(item.MedicalRemarks === "" || item.MedicalRemarks == null) ? null :
                                                    <tr style={{ height: '0.23489in' }} className="">
                                                        <td style={{ padding: '2pt', }} colSpan={2}>
                                                            <strong>
                                                            <div dangerouslySetInnerHTML={{ __html: "Comments" }} />
                                                            </strong> 
                                                        </td>
                                                        <td style={{ padding: '2pt' }} colSpan={3} >
                                                        <div dangerouslySetInnerHTML={{ __html: ` : ${item.MedicalRemarks}` }} />
                                                        </td>
                                                    </tr>
                                                     }
                                                    </React.Fragment>
                                                 )}

                                                {dataset1Values && dataset1Values.length > 0 && dataset1Values.map((item, index) => 
                                                <React.Fragment key={index}>
                                                 {item.patientvisiid ==null && item.outputgroupingcode !== "AFB" &&
                                                        <tr style={{ height: '0.23489in' }}>
                                                            <td colSpan={12} style={{ padding: '2pt', textAlign:'center'}}>
                                                            <strong>
                                                                <div className="" dangerouslySetInnerHTML={{ __html: `<br/>${item.NAME}<br/>` }}/>
                                                            </strong>
                                                            </td>
                                                        </tr>
                                                        }
                                                        <br />
                                                        
                                                       {(item.PatientvisiId == null &&
                                                        item.OutputGroupingCode === "AFB" &&
                                                        item.CodeName !== "C0197_C_G2_IQVIA" &&
                                                        item.CodeName !== "F0120_G2" &&
                                                        item.CodeName !== "N0061_G1") ? null :
                                                        <tr key={index} style={{ height: '0.23489in' }}>
                                                        <td style={{ padding: '2pt' }} colSpan={1}>
                                                          <strong>Antitubercular Drug</strong>
                                                        </td>
                                                        <>
                                                            <tr>
                                                                <td style={{ padding: '2pt', textAlign: 'center' }} colSpan={4}>
                                                                <strong>
                                                                    {dataset1Values && dataset1Values.length > 0 && (
                                                                    dataset1Values.some(item => 
                                                                        (item.codename && item.codename.trim().includes("A0063_G")) || 
                                                                        (item.codename && item.codename.trim().includes("A0064_G"))
                                                                    )
                                                                    ? "MIC (ug/ml)"
                                                                    : "Critical Concentration (ug/ml)"
                                                                    )}
                                                                </strong>
                                                                </td>
                                                            </tr>
                                                            </>
                                                        <td style={{ padding: '2pt', textAlign: 'center' }} colSpan={1}>
                                                          <strong>Interpretation</strong>
                                                        </td>
                                                      </tr>
                                                    }

                                                    {item.PatientvisiId == null && 
                                                        item.OutputGroupingCode === "AFB" && 
                                                        (item.CodeName === "F0120_G2" || item.CodeName === "N0061_G1")&&

                                                        <tr style={{ height: '0.23489in' }} className="iip">
                                                        <td style={{ padding: '2pt' }} colSpan={2}><strong>Antifungal Drug</strong></td>
                                                        <td style={{ padding: '2pt'}}>
                                                            <strong>
                                                            {item.CodeName.trim().includes("N0061_G1") || item.CodeName.trim().includes("F0120_G2")
                                                            ? "MIC (ug/ml)"
                                                            : "Critical Concentration (ug/ml)"}
                                                            </strong>
                                                            </td>
                                                        <td style={{ padding: '2pt' , textAlign:'center'}} colSpan={2}>
                                                            <strong>
                                                                Interpretation
                                                            </strong>
                                                        </td>
                                                        </tr>
                                                        }


                                        {item.PatientvisiId == null && 
                                            item.OutputGroupingCode === "AFB" && 
                                            item.CodeName === "C0197_C_G2_IQVIA"  &&
                                        <tr style={{ height: '0.23489in' }}>
                                        <td style={{ padding: '2pt'}} colSpan={2}><strong>Organism Name</strong></td>
                                        <td style={{ padding: '2pt'}}><strong>Result</strong></td>
                                        <td style={{ padding: '2pt'}} colSpan={2}><strong> Biological Reference Range</strong>
                                        </td>
                                        </tr>
                                        }

                                        { item.OutputGroupingCode === "AFB" && 
                                            item.PatientvisiId > 0 && 
                                            item.OutputInvestigationCode !== "AFB-INV" &&

                                        <tr style={{ height: '0.23489in' }}>
                                        <td style={{ padding: '2pt'}}>
                                        <strong>
                                                    <div dangerouslySetInnerHTML={{ __html: `${item.NAME}` }} />
                                        </strong>
                                        </td>

                                        <td style={{ padding: '2pt'}}>
                                        {
                                            (item.Result.split(",").length <= 1 
                                            ? "," 
                                            : item.Result).split(",")[1]
                                        }
                                        </td>
                                        <td style={{ padding: '2pt' }}  colSpan={2}>
                                        {Fields.Result.split(",")[0]}
                                         </td>
                                        </tr>
                                        }



                                        {/* { item => item.MedicalRemarks && item.MedicalRemarks.trim() !== ""&&
                                            <tr key={index} style={{ height: '0.23489in' }}>
                                                <td style={{ padding: '2pt' }}>
                                                <strong>Comments</strong>
                                                </td>
                                                <td style={{ padding: '2pt' }} colSpan={3}>
                                                <div dangerouslySetInnerHTML={{ __html: `: ${item.MedicalRemarks}` }} />
                                                </td>
                                            </tr>
                                            } */}
                                        
                                       {item.PatientvisiId > 0 && item.OutputInvestigationCode === "AFB-INV" &&
                                         <tr style={{ height: '0.23489in' }} className="iip">
                                        <td style={{ padding: '2pt'}}  colSpan={3}>
                                             <strong>
                                             <div className="" dangerouslySetInnerHTML={{ __html: `${item.NAME}` }} />
                                            </strong></td>
                                         <td style={{ padding: '2pt'}}><strong>:</strong></td>
                                         <td style={{ padding: '2pt'}} colSpan={3}>
                                             <div dangerouslySetInnerHTML={{__html:`${item.Result}`}}/>
                                        </td>
                                        </tr>
                                       }
                                        </React.Fragment>
                                         )}
                                        <br></br> 
                                        <table>
                                        <tbody>
                                       
                                         </tbody>
                                        </table>
                                         
                                           
                                                
                                                   
            </Page>

 
        </>
    );
};

export async function getServerSideProps(context) {
    try {
        const { pVisitId, orgId, accessionNumber, stationary, status } = context.query;
        const [reportTemplate, patientDetails, barcode] = await Promise.all([
            getReportTemplate(pVisitId, orgId),
            getPatientBiographyNew(pVisitId, orgId),
            getBarcode(pVisitId, orgId),
        ]);
        let templateId = 90
        let accession = () => handleAccession(accessionNumber, status, reportTemplate, TEMPLATE_ID)
        const invIdArray = accession() && accession().length > 0 ? accession().split(",").map(Number) : [];
        const imageSourcePromises = invIdArray.length > 0 ? invIdArray.map(element => getCommonImageSource(pVisitId, orgId, element)) : []
        if (accession().length > 0) {
            console.log('TEMPLATE_ID :>> ', TEMPLATE_ID);
            const [data, graphData, groupFishName,methodNameSample,dataset1Values, electroImages, clientStatus, ...imageSourceResponses] = await Promise.all([
                getInvestigationForMerged(pVisitId, orgId, TEMPLATE_ID, accession()),
                getGrpLevelReportGraphs(pVisitId, 220, TEMPLATE_ID, '239617834', 0),
                PGetGroupNameForFish(pVisitId, orgId, TEMPLATE_ID, accession()),
                getMethodNameandSample(pVisitId, orgId, TEMPLATE_ID, accession()),
                DataSet1(pVisitId, orgId, TEMPLATE_ID, accession()),
                getImagesForImmulite(pVisitId, orgId, TEMPLATE_ID, accession()),
                getClientStatus(pVisitId, orgId), ...imageSourcePromises])
            let accessionNumbers = accession()
            console.log("dataset",dataset1Values)
            const interpretation = data.map(element => ([getTablularInterpretationMultiColumnDataset1(pVisitId, orgId, element.InvestigationID, "INV"), getTablularInterpretationMultiColumnDataset1(pVisitId, orgId, element.GrpID, "GRP")])).flat()
            const nablList = invIdArray.length > 0 ? invIdArray.map(element => (getCommonNablDetails(pVisitId, orgId, TEMPLATE_ID, element))) : []
            const [...nablRes] = await Promise.all(nablList)
            const nablData = nablRes.flat().map(src => src ?? null).filter(src => src !== null);
            let imageSource = imageSourceResponses.flat().map(src => src ?? null).filter(src => src !== null);
            const [draftStatus, orgs, pendingList, ...interpretationRes] = await Promise.all([
                getCommonInvStatusForDraft(pVisitId, orgId, accession()),
                getCommonTemplateForORGS(pVisitId, orgId, 4),
                getPendingListPendingItems(pVisitId, orgId),
                ...interpretation])
            let interpretationList = interpretationRes.flat().map(src => ({ ...src, invId: src?.invId ?? null, grpId: src?.grpId ?? null })).filter(src => src !== null && src !== undefined);
            let departments = data && data.length > 0 && data.map(item => item.DeptID).filter((value, index, self) => {
                return self.indexOf(value) === index;
            })
            let image = handleImage(stationary, orgs)
           
            return {
                props: { reportTemplate, pVisitId, orgId, patientDetails, barcode, groupFishName,methodNameSample,dataset1Values, data, accessionNumbers, imageSource, departments, interpretationList, draftStatus, orgs, pendingList, nablData, image: image != undefined && image != null ? image : "", electroImages, graphData, clientStatus, stationary: stationary != undefined ? stationary : false },
            };
        } else {
            return { props: { reportTemplate: [], pVisitId: [], orgId: [], patientDetails: [], barcode: [], data: [], accessionNumbers: [], imageSource: [], departments: [], interpretationList: [], draftStatus: [], orgs: [], pendingList: [], nablData: [], image: "", electroImages: [], graphData: [], clientStatus: [], stationary: false } };
        }
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return { props: { reportTemplate: [], pVisitId: [], orgId: [], patientDetails: [], barcode: [], data: [], accessionNumbers: [], imageSource: [], departments: [], interpretationList: [], draftStatus: [], orgs: [], pendingList: [], nablData: [], image: "", electroImages: [], graphData: [], clientStatus: [], stationary: false } };
    }
}
 