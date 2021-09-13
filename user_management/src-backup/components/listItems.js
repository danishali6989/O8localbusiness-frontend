
import {useHistory} from 'react-router-dom';
export const mainListItems = (
        <div>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon style={{ color:'#fff' }}/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button 
            onClick={(event)=>{
                event.preventDefault();

            }}
            >
                <ListItemIcon>
                    <ReorderIcon color="primary" style={{ color:'#fff' }}/>
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon  style={{ color:'#fff' }}/>
                </ListItemIcon>
                <ListItemText primary="Customers"  />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon style={{ color:'#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <LayersIcon  style={{ color:'#fff' }}/>
                </ListItemIcon>
                <ListItemText primary="Integrations" />
            </ListItem>
        </div>
    )


export const secondaryListItems = (
    <div>
        <ListSubheader inset style={{ color:'#fff' }}>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon color="inherit">
                <AssignmentIcon style={{ color:'#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon  style={{ color:'#fff' }}/>
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon style={{ color:'#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem>
    </div>
);
